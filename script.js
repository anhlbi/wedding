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


// 지도 띄우기 코드
var mapContainer = document.getElementById('map'); // 지도를 표시할 div
var mapOption = { 
    center: new kakao.maps.LatLng(35.148498, 126.8378945), // 라붐 웨딩홀 좌표
    level: 3 // 지도의 확대 레벨 (숫자가 작을수록 확대됨)
};

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 3. 마커(핀) 표시하기
var markerPosition  = new kakao.maps.LatLng(35.148498, 126.8378945); 

var marker = new kakao.maps.Marker({
    position: markerPosition
});

marker.setMap(map); // 지도 위에 마커를 올립니다

// (선택사항) 지도 확대 축소 막기 (모바일에서 스크롤 방해 방지)
// map.setZoomable(false); 


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
            // 네이버지도: 모바일 장소 검색 결과 화면으로 이동
            location.href = "https://m.place.naver.com/place/31320030/location?filter=location&selected_place_id=31320030";
            break;
    }
}


// 1. 결혼식 날짜 설정 (연-월-일 T 시:분:초)
const targetDate = new Date("2026-03-07T13:00:00").getTime();

function updateNewCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now; // 남은 시간 (음수면 지난 시간)

    // 시간 계산 (절댓값 Math.abs를 사용하여 지난 시간도 양수로 변환해 계산)
    const absDistance = Math.abs(distance);
    const days = Math.floor(absDistance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDistance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absDistance % (1000 * 60)) / 1000);

    // 표시할 문자열 준비 (기본값)
    let daysStr = days;
    let hoursStr = String(hours).padStart(2, "0");
    let minStr = String(minutes).padStart(2, "0");
    let secStr = String(seconds).padStart(2, "0");
    
    // 메시지 문구 요소 가져오기
    const messageBox = document.querySelector(".dday-message");

    // 상황별 분기 처리
    if (distance < 0) {
        // [CASE 1] 날짜가 지났을 때 (D+Day)
        
        // 숫자에 마이너스(-) 붙이기
        daysStr = "-" + days;
        hoursStr = "-" + String(hours).padStart(2, "0");
        minStr = "-" + String(minutes).padStart(2, "0");
        secStr = "-" + String(seconds).padStart(2, "0");

        // 하단 문구 변경: "지났습니다"
        messageBox.innerHTML = `🤵흘비와 👰민지의 결혼식이 <span class="dday-highlight">${days}일</span> 지났습니다.`;
        
    } else {
        // [CASE 2] 날짜가 남았을 때 (D-Day)
        
        // 하단 문구 변경: "남았습니다"
        if (days === 0) {
             messageBox.innerHTML = `🤵흘비와 👰민지의 결혼식이 <span class="dday-highlight">오늘</span> 입니다.`;
        } else {
             messageBox.innerHTML = `🤵흘비와 👰민지의 결혼식이 <span class="dday-highlight">${days}일</span> 남았습니다.`;
        }
    }

    // HTML에 시간 값 넣어주기
    document.getElementById("count-days").innerText = daysStr;
    document.getElementById("count-hours").innerText = hoursStr;
    document.getElementById("count-min").innerText = minStr;
    document.getElementById("count-sec").innerText = secStr;
}

// 1초마다 실행
setInterval(updateNewCountdown, 1000);
updateNewCountdown(); // 로딩 즉시 실행


// 1. 아코디언 기능 (펼치기/접기)
const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        // 클릭된 버튼에 active 클래스 토글 (화살표 모양 변경용)
        this.classList.toggle("active");

        // 바로 다음에 있는 요소(panel)을 찾음
        const panel = this.nextElementSibling;

        // 패널이 열려있으면 닫고, 닫혀있으면 엶
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            // scrollHeight는 숨겨진 내용의 전체 높이
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
}

// 2. 클립보드 복사 기능
function copyToClipboard(text) {
    // 최신 브라우저 (Navigator API) 사용
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('계좌번호가 복사되었습니다.\n' + text);
        }).catch(err => {
            console.error('복사 실패:', err);
            fallbackCopy(text);
        });
    } else {
        // 구형 브라우저 대응
        fallbackCopy(text);
    }
}

// 구형 브라우저를 위한 복사 기능 (Fallback)
function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('계좌번호가 복사되었습니다.\n' + text);
    } catch (err) {
        alert('복사에 실패했습니다. 번호를 직접 입력해주세요.');
    }
    document.body.removeChild(textArea);
}


// 구글 시트로 보내는 기능
const form = document.getElementById('gform');
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw69CoRSpuaQOOBimqHSbcHRNqgGgX0wAj8ky86hll5K5GDuvyYClF-ker8yeGyUngklw/exec"; 

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // 버튼 비활성화 (중복 클릭 방지)
    const btn = form.querySelector('.write-btn-submit');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "전송 중...";

    fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        alert("소중한 메시지가 전달되었습니다! 감사합니다. 🙇‍♂️🙇‍♀️");
        form.reset(); // 입력창 비우기
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerText = originalText;
    });
});


// 1. 마우스 오른쪽 클릭 방지 (전체 화면)
document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('prevent-save') || e.target.tagName === 'IMG') {
        e.preventDefault();
        // alert("사진은 눈으로만 봐주세요! ^^"); // 필요하면 경고창 주석을 해제하세요
    }
});

// 2. 이미지 드래그 시작 방지
document.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('prevent-save') || e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// 3. 선택 방지 (복사 방지)
// document.addEventListener('selectstart', function(e) {
//     e.preventDefault();
// });
