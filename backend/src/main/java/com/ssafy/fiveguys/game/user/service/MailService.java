package com.ssafy.fiveguys.game.user.service;

import com.ssafy.fiveguys.game.user.entity.EmailVerification;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMessage.RecipientType;
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
            "인증 번호는 " + verificationCode + "입니다." +
            "<br>" +
            "인증번호를 제대로 입력해주세요"; //이메일 내용 삽입
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
    }

    public boolean checkVerificationCode(EmailVerification emailVerification) {
        String requestVerificationCode = emailVerification.getVerificationCode();
        String verificationCodeInRedis = redisService.getVerificationCode(
            emailVerification.getEmail());
        return requestVerificationCode.equals(verificationCodeInRedis);
    }
}
