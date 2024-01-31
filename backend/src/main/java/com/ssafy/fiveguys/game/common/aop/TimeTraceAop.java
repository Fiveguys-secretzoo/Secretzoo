package com.ssafy.fiveguys.game.common.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Slf4j
@Aspect
@Component
public class TimeTraceAop {

    @Around("@annotation(TimeTrace)")
    public Object timeTrace(ProceedingJoinPoint joinPoint) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        Object proceed = joinPoint.proceed();
        stopWatch.stop();
        log.info(stopWatch.prettyPrint());
        return proceed;
    }
}
