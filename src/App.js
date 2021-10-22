import {useCallback, useEffect, useState} from 'react';

import NavBtn from './NavBtn';
import Repo from './Repo';
import SearchBox from './SeachBox';
import github from './db';
import query from './Query';

function App() {
  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(3);

  const [paginationKeyword, setPaginationKeyword] = useState('first');
  const [paginationString, setPaginationString] = useState('');
  const [startCursor, setStartCursor] = useState('');
  const [endCursor, setEndCursor] = useState('');
  const [hasPreviousPage, setPreviousPage] = useState(false);
  const [hasNextPage, setNextPage] = useState(false);

  const fetchData = useCallback(() => {
    fetch(github.baseUrl, {
      headers: github.headers,
      method: 'POST',
      body: JSON.stringify(query(countPerPage, searchQuery, paginationKeyword, paginationString))
    })
      .then(response => response.json())
      .then(data => {
        const viewer = data.data.viewer;
        const search = data.data.search;
        const pageInfo = data.data.search.pageInfo;
        setUserName(viewer.name);
        setRepoList(search.edges);
        setTotalCount(search.repositoryCount);
        setStartCursor(pageInfo.startCursor);
        setEndCursor(pageInfo.endCursor);
        setPreviousPage(pageInfo.hasPreviousPage);
        setNextPage(pageInfo.hasNextPage);
      })
      .catch(e => console.error(e));
  }, [countPerPage, searchQuery, paginationKeyword, paginationString]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div className="App container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill"></i>Repos</h1>
      <h3>{userName}</h3>
      <NavBtn 
        start={startCursor} 
        end={endCursor} 
        next={hasNextPage} 
        previous={hasPreviousPage} 
        onPage={(paginationKey, paginationString) => {
          setPaginationKeyword(paginationKey); 
          setPaginationString(paginationString);}}
      />
      <SearchBox
        searchQuery = {searchQuery}
        totalCount = {totalCount}
        countPerPage = {countPerPage}
        onChangeSearchQuery = {(searchQuery) => {setSearchQuery(searchQuery)}}
        onChangeCountPerPage = {(count) => {setCountPerPage(count)}}
      />
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map(repo => (
            <Repo key={repo.node.id} repo={repo.node}/>
          ))}
        </ul>
      )}
      <NavBtn 
        start={startCursor} 
        end={endCursor} 
        next={hasNextPage} 
        previous={hasPreviousPage} 
        onPage={(paginationKey, paginationString) => {
          setPaginationKeyword(paginationKey); 
          setPaginationString(paginationString);}}
      />
    </div>
  );
}

export default App;
