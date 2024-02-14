package com.ssafy.fiveguys.game.common.entity;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.sql.Timestamp;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@MappedSuperclass // 상속한 엔티티들은 아래 필드를 칼럼으로 인식
@EntityListeners(AuditingEntityListener.class) // 자동 값 매핑 기능 추가
public abstract class BaseTimeEntity {

    @CreationTimestamp
    private Timestamp creationDate;

    @LastModifiedDate
    private Timestamp lastModifiedDate;

}
