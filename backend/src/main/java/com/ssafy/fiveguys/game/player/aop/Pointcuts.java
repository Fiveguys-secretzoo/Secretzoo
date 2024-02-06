package com.ssafy.fiveguys.game.player.aop;

import org.aspectj.lang.annotation.Pointcut;

public class Pointcuts {
    //com.ssafy.fiveguys.game.player. 패키지와 하위 패키지
    @Pointcut("execution(* com.ssafy.fiveguys.game.player..*(..))")
    public void allPlayer(){} //pointcut signature

    //클래스 이름 패턴이 *Service
    @Pointcut("execution(* *..*Service.*(..))")
    public void allService(){}

    //allPlayer && allService
    @Pointcut("allPlayer() && allService()")
    public void playerAndService() {}
}
