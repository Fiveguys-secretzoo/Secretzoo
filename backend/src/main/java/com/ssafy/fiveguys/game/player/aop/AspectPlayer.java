package com.ssafy.fiveguys.game.player.aop;


import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AspectPlayer {
    @Aspect
    @Order(2)
    public static class LogAspect {
        @Around("com.ssafy.fiveguys.game.player.aop.Pointcuts.all()")
        public Object doLog(ProceedingJoinPoint joinPoint) throws Throwable {
            log.info("[player log] {}", joinPoint.getSignature()); //join point 시그니처
            return joinPoint.proceed();
        }
    }

    @Aspect
    @Order(1)
    public static class TxAspect {
        @Around("com.ssafy.fiveguys.game.player.aop.Pointcuts.playerAndService()")
        public Object doTransaction(ProceedingJoinPoint joinPoint) throws Throwable {

            try {
                log.info("[player transaction start] {}", joinPoint.getSignature());
                Object result = joinPoint.proceed();
                log.info("[player transaction commit] {}", joinPoint.getSignature());
                return result;
            } catch (Exception e) {
                log.info("[player transaction rollback] {}", joinPoint.getSignature());
                throw e;
            } finally {
                log.info("[player resource release] {}", joinPoint.getSignature());
            }
        }
    }
}
