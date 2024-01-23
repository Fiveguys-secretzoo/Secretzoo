package com.example.ranking.service;


import com.example.ranking.repository.PlayerRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RewardsService {

    private final PlayerRepository playerRepository;
    private final EntityManager em;


}
