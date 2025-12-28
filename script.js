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
function openNavi(type) {
    // 라붐 웨딩홀 (광주) 좌표
    const lat = 35.148498;
    const lng = 126.8378945;
    const name = "라붐웨딩홀";

    let url = "";

    switch(type) {
        case 'tmap':
            // 티맵: 앱을 직접 실행하는 스키마 사용 (앱이 설치된 폰에서만 작동)
            // 주의: PC에서는 반응이 없을 수 있습니다.
            location.href = `tmap://route?goalname=${name}&goalx=${lng}&goaly=${lat}`;
            break;

        case 'kakao':
            // 카카오맵: 웹 브라우저로 열기 -> 앱이 있으면 앱 실행 버튼이 뜸
            location.href = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
            break;

        case 'naver':
            // 네이버지도: 모바일 웹 길찾기 페이지로 이동
            location.href = `https://m.map.naver.com/route.nhn?menu=route&ename=${name}&ex=${lng}&ey=${lat}&pathType=0&showMap=true`;
            break;
    }
}
