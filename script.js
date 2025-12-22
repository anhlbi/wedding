// 계좌번호 복사 기능
function copyToClipboard(text) {
    // 최신 브라우저 API 사용
    navigator.clipboard.writeText(text).then(() => {
        alert('계좌번호가 복사되었습니다.');
    }).catch(err => {
        // 일부 브라우저 호환성을 위한 예외 처리
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다. 직접 입력해주세요.');
    });
}

// 내비게이션 앱 연결 기능
// 실제 배포 시에는 각 지도 앱의 URL Scheme이나 웹 링크를 정확히 넣어야 합니다.
function openNavi(type) {
    // 목적지 이름과 위도, 경도를 설정하세요 (구글맵에서 장소 검색 후 좌표 확인)
    const lat = 37.498095; // 예시 위도 (강남역)
    const lng = 127.027610; // 예시 경도
    const name = "OO웨딩홀";

    let url = "";

    switch(type) {
        case 'tmap':
            // 티맵은 모바일 웹이나 앱 스키마 필요. 여기선 모바일 웹 검색으로 대체 예시
            url = `https://surl.tmap.co.kr/링크생성필요`; 
            // *실제 팁*: 티맵은 외부 링크 생성이 까다로우므로, 장소 URL을 직접 따오는 것이 좋습니다.
            // 간단하게는: 
            alert("티맵 앱이 설치되어 있어야 연동이 원활합니다.");
            return; 
        case 'kakao':
            // 카카오맵 웹 길찾기
            url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
            break;
        case 'naver':
            // 네이버지도 모바일 웹
            url = `https://m.map.naver.com/nav/index.nhn?ename=${name}&elat=${lat}&elng=${lng}&pathType=0&showMap=true`;
            break;
    }
    
    if(url) {
        window.open(url, '_blank');
    }
}
