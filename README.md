rafce tab -> 화살표 함수

node_modules 다시 설치: npm install
server 띄우기: npm run dev

router: npm install react-router-dom

CSS(스타일): npm install styled-components

    <div>
      {infos.map(item =>(
        Object.keys(item).map( key => (
            <th>{key}</th>
        ))
      ))}
    </div>