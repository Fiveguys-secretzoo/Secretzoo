package com.ssafy.fiveguys.game.player.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public class BaseTimeEntity {

    //생성일은 수정되면 안되기 때문에 updatable = false 설정
    @CreatedDate
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(columnDefinition = "TIMESTAMP DEFAULT now()")
    private LocalDateTime lastModifiedDate;
}