rafce tab -> 화살표 함수

node_modules 다시 설치: npm install
server 띄우기: npm run dev

router: npm install react-router-dom

아이콘: npm install react-icons

CSS(스타일): npm install styled-components

    <div>
      {infos.map(item =>(
        Object.keys(item).map( key => (
            <th>{key}</th>
        ))
      ))}
    </div>


reducer

  dispatch: 함수를 실행하는 함수
  action: 전체 Object 인수
  action.type: 함수의 타입
  action.payload: state를 변화시킬 수 있는 인수 

  useState => useReducer => useContext => redux

  context: state, 내부함수(reducers)
  redux: state, 내부함수(reducers), 외부함수(extraReducers: api)