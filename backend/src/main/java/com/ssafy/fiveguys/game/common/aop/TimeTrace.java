package com.ssafy.fiveguys.game.common.aop;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD) // 메서드에 어노테이션 가능
@Retention(RetentionPolicy.RUNTIME) // 어노테이션이 런타임까지 유지
public @interface TimeTrace {
}
