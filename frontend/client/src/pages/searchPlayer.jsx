import React, { useState } from 'react';
import { Button, Card, TextInput, Dropdown, Pagination } from 'flowbite-react';
import { IoMdSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchPlayer = () => {
  const [searchCondition, setSearchCondition] = useState('닉네임');
  const [searchResult, setSearchResult] = useState(null);
  const [searchContent, setSearchContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = async (page) => {
    await setCurrentPage(page);
    search(page);
  };

  const search = (page) => {
    let trueSechCondition 
    if (searchCondition === '닉네임') {
      trueSechCondition = 'nickname'
    } else if(searchCondition === '아이디'){
      trueSechCondition = 'userId'
    } else {
      trueSechCondition = 'name'
    }
    const param = {
      [trueSechCondition] : searchContent,
      "page" : page-1,
      "size" : 4,
    }
    axios.get('https://spring.secretzoo.site/players/search',{params : param})
    .then((Response) => {
      setSearchResult(Response.data);
      console.log(Response.data)
    });
  }
  const navigate = useNavigate();
  const goToDetail = (userSequence) => {
    navigate(`/lobby/searchPlayer/${userSequence}`)
  }
  return (
    <>
      <form>
        <div className='container flex mb-2'>
          <Dropdown label={searchCondition}  
          renderTrigger={({ isOpen }) => (
          <Button className='w-24' >
            {searchCondition}<FaChevronDown></FaChevronDown>
          </Button>
        )}>
            <Dropdown.Item onClick={() => setSearchCondition('닉네임')}>닉네임</Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchCondition('아이디')}>아이디</Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchCondition('이름')}>이름</Dropdown.Item>
        </Dropdown>
            <TextInput 
            className='flex-grow'
            value={searchContent}
            onChange={(e) =>setSearchContent(e.target.value)}
            ></TextInput>
            <Button type='submit' onClick={(e) => {e.preventDefault(); search(1)}}>
              검색 
              <IoMdSearch className='ml-2'></IoMdSearch>
            </Button>
        </div>
      </form>
        <div>
            {searchResult ? (
            <div>
              <div className='h-[30em]'>
                {searchResult.data.map((element, index) => (
                  <Card 
                  href='#' 
                  key={index}
                  onClick={(e) => { e.preventDefault(); goToDetail(element.userSequence)}}>
                    <div> 아이디 : {element.userId} 닉네임  : {element.nickname}</div>
                    <div> 레벨 : {element.level} 대표업적 : {element.mainReward} </div>
                  </Card>
                ))}
              </div>
              <div className="flex overflow-x-auto sm:justify-center">
                <Pagination 
                currentPage={currentPage} 
                totalPages={Math.round(searchResult.totalPlayer/4)} 
                onPageChange={onPageChange} showIcons/>
              </div>
            </div> ): ( <div>조회된 플레이어가 없습니다.</div>)}
        </div>
    </>
  );
};

export default SearchPlayer;