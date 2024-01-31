package com.ssafy.fiveguys.game.user.repository;

import com.ssafy.fiveguys.game.user.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RedisRepository extends CrudRepository<RefreshToken, String> {

}
