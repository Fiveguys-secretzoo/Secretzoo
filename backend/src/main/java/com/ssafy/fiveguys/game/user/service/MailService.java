package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.entity.EmailVerification;
import com.ssafy.fiveguys.game.user.exception.DuplicateIdentifierException;
import com.ssafy.fiveguys.game.user.exception.VerificationCodeException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MailService {

    private final JavaMailSender javaMailSender;
    private final RedisService redisService;
    private final UserService userService;

    public String generateRandomNumber() {
        String randomNumber = "";
        for (int i = 0; i < 6; i++) {
            randomNumber += Integer.toString(new Random().nextInt(10));
        }
        return randomNumber;
    }

    public void sendEmail(String email) throws MessagingException {
        String verificationCode = generateRandomNumber();
        String setForm = "jyk.co.ltd";
        String title = "SecretZoo 회원가입 인증 이메일 입니다.";
        String content = "SecretZoo 서비스를 이용해 주셔서 진심으로 감사합니다." + //html 형식으로 작성 !
            "<br><br>" +
            "인증 번호는 <strong>" + verificationCode + "</strong>입니다." +
            "<br>" +
            "유효시간은 <strong style=\"color: red\">10분</strong> 입니다."; //이메일 내용 삽입
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false, "UTF-8");
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject(title);
        mimeMessageHelper.setFrom(setForm);
        mimeMessageHelper.setText(content, true);
        if (redisService.getVerificationCode(email) != null) {
            redisService.deleteVerificationCode(email);
        }
        redisService.saveVerificationCode(email, verificationCode);
        javaMailSender.send(message);
        log.info("request to send email successfully.");
    }

    public void checkVerificationCode(EmailVerification emailVerification) {
        String requestVerificationCode = emailVerification.getVerificationCode();
        String verificationCodeInRedis = redisService.getVerificationCode(
            emailVerification.getEmail());
        if (!requestVerificationCode.equals(verificationCodeInRedis)) {
            throw new VerificationCodeException("인증 코드가 유효하지 않습니다.");
        }
        log.info("Email Verifictaion success.");
    }

    public void isDuplicateEmail(String email) throws DuplicateIdentifierException {
        if (userService.verifyEmail(email)) {
            throw new DuplicateIdentifierException("이미 가입되어 있는 이메일입니다.");
        }
        log.info("Email verification successful.");
    }
}
