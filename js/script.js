document.addEventListener('DOMContentLoaded', () => {
    const home_button = document.getElementById("home-button")
    const list_button = document.getElementById("lists-button")
    const write_button = document.getElementById("write-button")

    function localLoad() {
        let memory = localStorage.getItem('data_box')
        return JSON.parse(memory) ?? []
    }
    // 스토리지에서 데이터 받는 함수 const 배열 = localLoad()로 받으면 됨
    // 스토리지에 올라가 있는 data_box를 받아오는 과정
    // 스토리지에 내용이 없다면 빈 배열로 받음
    function localSave(data) {
        let memory = JSON.stringify(data)
        localStorage.setItem('data_box', memory)
    }
    // 데이터를 JSON화 시켜줌

    let data_box = []
    // 사용할 데이터 배열에 스토리지 데이터 받음

    let count
    // 고유넘버


    //# 게시판 생성 시작
    // 게시판 생성 함수 시작
    let notice_board_create = function () {
        data_box = localLoad()

        if (data_box.length == 0) {
            count = 0
            // 스토리지에 데이터가 없으면 0(1)부터 다시 시작
        } else {
            count = data_box[data_box.length - 1].id_num
            // 스토리지에서 받은 데이터(배열)의 마지막 요소의 id_num을 받아 count를 이어준다.
        }

        const lists_section = document.getElementById("sections")
        const section = document.createElement('section');  //상단바메뉴를 뺀 전체 내용
        const h2 = document.createElement('h2');    //타이틀
        const img = document.createElement('img');  //게시판 이미지
        const hr = document.createElement('hr');
        const input = document.createElement('input');  //검색
        const group = document.createElement('colgroup'); //각 컬럼에 width를 주기위한태그(colgroup 태그의 width 속성)
        const table = document.createElement('table');  //테이블 생성
        const thead = document.createElement('thead'); //표의 제목을 나타내는 태그
        const tr = document.createElement('tr');
        const tbody = document.createElement('tbody')
        const page_numbers = document.createElement('div') // 페이지 넘버
        const button = document.createElement('button');    //글쓰기 버튼

        const width_arr = [10, 25, 10, 10, 30];     //각 컬럼에 width 부여
        const arr = ['글번호', '제목', '작성자', '조회수', '작성일자'];     //컬럼 제목들

        lists_section.appendChild(section);
        Object.assign(section, {
            id: 'post-list',
            margin: '30px 15px'
        })
        Object.assign(h2, {
            innerHTML: '게시판',
            style: 'display:inline;'    //h2의 기본속성인 줄바꿈 해제
        })
        Object.assign(img, {
            id: "post-img",
            src: './img/post.png'
        })
        Object.assign(input, {
            id: 'search_input',
            placeholder: '검색어를 입력하세요.'
        })
        Object.assign(table, {
            width: '100%'
        })
        Object.assign(page_numbers, {
            id: "page-numbers"
        })
        Object.assign(button, {
            id: 'post-btnwrite',
            textContent: '글쓰기'
        })
        Object.assign(thead, {
            id: "thead-01"
        })
        Object.assign(tbody, {
            id: "tbody-01"
        })
        section.append(img, h2, hr, input, table, page_numbers, button);
        table.append(group, thead, tbody);
        thead.appendChild(tr);

        width_arr.forEach(v => {
            const col = document.createElement('col');
            col.style.cssText = `width : ${v}%`;
            group.appendChild(col);
        })
        arr.forEach(v => {
            const th = document.createElement('th');
            th.textContent = v;
            tr.appendChild(th);
        })
        // 게시판 틀 작성

        // 게시판 글(한줄) 생성 함수 시작
        const list_cteate = function (a) {
            const tbody = document.getElementById("tbody-01")
            const tr1 = document.createElement("tr");
            const numtd = document.createElement('td');         //글번호 td
            const titletd = document.createElement('td');       //제목 td
            const writertd = document.createElement('td');      //작성자 td
            const viewstd = document.createElement('td');       //조회수 td
            const datatd = document.createElement('td');        //작성일자 td

            Object.assign(tr1, {
                className: "board-list-tr"
            })
            Object.assign(numtd, {
                className: "board-list-num",
                textContent: data_box[a].id_num
            })
            Object.assign(titletd, {
                className: "board-list-title",
                textContent: data_box[a].title
            })
            Object.assign(writertd, {
                className: "board-list-witer",
                textContent: data_box[a].writer
            })
            Object.assign(viewstd, {
                className: "board-list-views",
                textContent: data_box[a].views
            })
            Object.assign(datatd, {
                className: "board-list-date",
                textContent: data_box[a].date
            })

            tbody.appendChild(tr1);
            tr1.append(numtd, titletd, writertd, viewstd, datatd);

            tr1.addEventListener('click', (event) => {
                data_box[a].views++
                localSave(data_box)
                list_revise(a)
                const lists_section = document.getElementById("sections")
                const post_list = document.getElementById("post-list")
                lists_section.removeChild(post_list)
            })
        }
        // 게시판 글(한줄) 생성 함수 끝

        // tbody 생성 시작
        if (data_box.length > 10) {
            for (let i = data_box.length - 1; i > data_box.length - 11; i--) {
                list_cteate(i)
                // 최신 게시글이 위에 올라오게끔, 최신 글 10개를 제일 첫 화면에 생성
            }
        } else {
            //  게시글이 10개가 안될 경우 게시글 외에 더미를 생성해서 10칸을 채움
            for (let i = data_box.length - 1; i >= 0; i--) {
                list_cteate(i)
            }
            for (let i = 0; i < 10 - data_box.length; i++) {
                const tbody = document.getElementById("tbody-01")
                const tr_dummy = document.createElement("tr")
                const td_dummy01 = document.createElement("td")
                const td_dummy02 = document.createElement("td")
                const td_dummy03 = document.createElement("td")
                const td_dummy04 = document.createElement("td")
                const td_dummy05 = document.createElement("td")
                tbody.appendChild(tr_dummy)
                tr_dummy.append(td_dummy01, td_dummy02, td_dummy03, td_dummy04, td_dummy05)
                Object.assign(tr_dummy, {
                    className: "board-list-tr-dummy"
                    // 더비 tr에 스타일 부여할 수 있게
                })
            }
        }
        // tbody 생성 시작

        // 페이지 버튼 생성 시작 
        const page_num = Math.ceil(data_box.length / 10)
        // 나눴을 때 올림해주는 연산입니다. ex) 게시물이 45개일때 페이지는 5장이니까..
        // 페이지 넘버를 미리 저장할게요
        if (data_box.length > 0) {
            for (let j = page_num; j > 0; j--) {
                const page_numbers = document.getElementById("page-numbers")
                const page_number = document.createElement('span')
                page_numbers.appendChild(page_number)
                page_number.textContent = j
                // 페이지 넘버를 append해줍니다.
                page_number.addEventListener('click', (event) => {
                    const tbody_01 = document.getElementById("tbody-01")
                    table.removeChild(tbody_01)
                    // table에 tbody 태그를 만들어서 지우기 쉽게 만들었습니다.
                    // 지우고 다시 넣겠습니다.
                    const tbody = document.createElement('tbody')
                    tbody.setAttribute("id", "tbody-01")
                    table.appendChild(tbody)
                    if (j !== 1) {
                        for (let k = data_box.length - 1 - (page_num - j) * 10; k > data_box.length - 11 - (page_num - j) * 10; k--) {
                            list_cteate(k)
                        }
                    } else {
                        for (let k = data_box.length - 1 - (page_num - j) * 10; k >= 0; k--) {
                            list_cteate(k)
                        }
                        for (let i = 0; i < 10 - data_box.length % 10; i++) {
                            const tbody = document.getElementById("tbody-01")
                            const tr_dummy = document.createElement("tr")
                            const td_dummy01 = document.createElement("td")
                            const td_dummy02 = document.createElement("td")
                            const td_dummy03 = document.createElement("td")
                            const td_dummy04 = document.createElement("td")
                            const td_dummy05 = document.createElement("td")
                            tbody.appendChild(tr_dummy)
                            tr_dummy.append(td_dummy01, td_dummy02, td_dummy03, td_dummy04, td_dummy05)
                            Object.assign(tr_dummy, {
                                className: "board-list-tr-dummy"
                            })
                        }
                    }
                    // 뒤에서 10개씩 끊어가는 느낌으로다가
                })
            }
        }
        // 페이지 버튼 생성 끝

    }
    // 게시판 생성 함수 끝

    notice_board_create()
    //게시판 작성 끝

    // 게시판 버튼 시작
    list_button.addEventListener('click', (event) => {

        if (document.getElementById("revise-div")) {
            const div0 = document.getElementById("sections")
            const div1 = document.getElementById("revise-div")
            div0.removeChild(div1)
        }
        if (document.getElementById("write-write-con")) {
            const div0 = document.getElementById("sections")
            const div1 = document.getElementById("write-write-con")
            div0.removeChild(div1)
        }
        if (!document.getElementById("post-list")) {
            if (window.confirm('저장하지 않으셨습니다. 게시판으로 이동하시겠습니까?')) {
                notice_board_create()
            }
        }
    })
    // 게시판 버튼 끝

    // 글 수정 함수 시작
    const list_revise = function (a) {

        const div0 = document.getElementById("sections")
        div0.setAttribute('class', 'dd')
        //클릭후 div화면 on
        let arr = [];
        let count = 0;
        let views = 0;
        let now = 0;


        //타이틀 글생성
        const div00 = document.createElement('div')//버튼후 젤큰div
        const div1 = document.createElement('div') //글번호
        const div2 = document.createElement('div') //제목
        const div3 = document.createElement('div') //조회수
        const div4 = document.createElement('div') //작성자
        const div5 = document.createElement('div') //작성일시
        const div6 = document.createElement('div') //내용
        const div7 = document.createElement('div') //첨부이미지
        const img = document.createElement('img') //이미지내용
        //내용 생성
        const text1 = document.createElement('textarea')
        const text2 = document.createElement('textarea')
        const text3 = document.createElement('textarea')
        const text4 = document.createElement('textarea')
        const text5 = document.createElement('textarea')
        const text6 = document.createElement('textarea')

        //버튼생성
        const button1 = document.createElement('button')
        const button2 = document.createElement('button')
        const button3 = document.createElement('button')
        const button4 = document.createElement('button')
        const button5 = document.createElement('button')
        //글머리
        const span1 = document.createElement('span')
        const span2 = document.createElement('span')
        const span3 = document.createElement('span')
        const span4 = document.createElement('span')
        const span5 = document.createElement('span')
        const span6 = document.createElement('span')
        const span7 = document.createElement('span')

        //span class
        span1.setAttribute('class', 'span_op')
        span2.setAttribute('class', 'span_op')
        span3.setAttribute('class', 'span_op')
        span4.setAttribute('class', 'span_op')
        span5.setAttribute('class', 'span_op')
        span6.setAttribute('class', 'span_op')
        span7.setAttribute('class', 'span_op')

        //div 타이틀
        span1.textContent = '글번호'
        span2.textContent = '제목'
        span3.textContent = '조회수'
        span4.textContent = '작성자'
        span5.textContent = '작성일시'
        span6.textContent = '내용'
        span7.textContent = '첨부이미지'
        //div class
        div00.setAttribute('class', 'div_op0')
        div1.setAttribute('class', 'div_op')
        div2.setAttribute('class', 'div_op')
        div3.setAttribute('class', 'div_op')
        div4.setAttribute('class', 'div_op')
        div5.setAttribute('class', 'div_op')
        div6.setAttribute('class', 'div_op')
        div7.setAttribute('class', 'div_op7')

        //img 넣기
        img.setAttribute('src', './img/코딩싫어1.jpg')
        img.setAttribute('class', 'sp')

        //textarea Css
        text1.style.cssText = 'border : 1px soild #000;'
        text2.style.cssText = 'border : 1px soild #000;'
        text3.style.cssText = 'border : 1px soild #000;'
        text4.style.cssText = 'border : 1px soild #000;'
        text5.style.cssText = 'border : 1px soild #000;'
        text6.style.cssText = 'border : 1px soild #000;'

        
        //버튼 타이틀
        button1.textContent = '목록'
        button2.textContent = '저장'
        button3.textContent = '삭제'
        button4.textContent = '이전글'
        button5.textContent = '다음글'

        //버튼 class
        button1.setAttribute('class', 'btn_list')
        button2.setAttribute('class', 'btn_co')
        button3.setAttribute('class', 'btn_del')
        button4.setAttribute('class', 'btn_before')
        button5.setAttribute('class', 'btn_after')

        // 출력
        div0.appendChild(div00).append(div1, div2, div3, div4, div5, div6, div7,
            button1, button2, button3, button4, button5)
        div1.append(span1, text1)
        div2.append(span2, text2)
        div3.append(span3, text3)
        div4.append(span4, text4)
        div5.append(span5, text5)
        div6.append(span6, text6)
        div7.append(span7, img)

        //local값
        Object.assign(div00, {
            id: "revise-div"
        })
        Object.assign(text1, {
            textContent: data_box[a].id_num
        })
        Object.assign(text2, {
            textContent: data_box[a].title
        })
        Object.assign(text3, {
            textContent: data_box[a].views
        })
        Object.assign(text4, {
            textContent: data_box[a].writer
        })
        Object.assign(text5, {
            textContent: data_box[a].date
        })
        Object.assign(text6, {
            textContent: data_box[a].content
        })

        // 목록 버튼
        button1.addEventListener('click', () => {
            if (window.confirm('게시판으로 이동하시겠습니까?')) {
                div0.removeChild(div00)
                notice_board_create()
            }
        })
        // 저장 버튼
        button2.addEventListener('click', () => {
            if (window.confirm('저장하시겠습니까? 저장 후엔 게시판으로 이동합니다.')) {
                data_box[a].title = text1.value
                data_box[a].writer = text4.value
                data_box[a].content = text6.value
                localSave(data_box)
                div0.removeChild(div00)
                notice_board_create()
            }
        })
        // 삭제 버튼
        button3.addEventListener('click', () => {
            if (window.confirm('삭제하시겠습니까? 삭제 후엔 게시판으로 이동합니다.')) {
                data_box.splice(data_box.indexOf(data_box[a]), 1)
                localSave(data_box)
                div0.removeChild(div00)
                notice_board_create()
            }
        })
    }
    // 글 수정 함수 끝

    // 글작성 버튼 시작
    write_button.addEventListener('click', (event) => {
        // 글작성 창이 하나만 뜨게
        if (!document.getElementById('write-write-con')) {
            const lists_section = document.getElementById("sections")
            const post_list = document.getElementById("post-list")
            lists_section.removeChild(post_list)

            const write_section = document.getElementById('sections')
            const write_con = document.createElement('div') // 큰 틀
            const hr01 = document.createElement('hr') // 줄
            const hr02 = document.createElement('hr')
            const hr03 = document.createElement('hr')
            const hr04 = document.createElement('hr')
            const head_con = document.createElement('div')
            const icon_span = document.createElement('span')
            const head_span = document.createElement('span')
            const title_con = document.createElement('div')
            const title_span = document.createElement('span')
            const title_input = document.createElement('textarea')
            const content_con = document.createElement('div')
            const content_span = document.createElement('span')
            const content_input = document.createElement('textarea')
            const writer_con = document.createElement('div')
            const writer_span = document.createElement('span')
            const writer_input = document.createElement('textarea')
            const image_con = document.createElement('div')
            const image_span = document.createElement('span')
            const image_select = document.createElement('select')
            const image_option_none = document.createElement('option')
            const image_option01 = document.createElement('option')
            const image_option02 = document.createElement('option')
            const image_option03 = document.createElement('option')
            const button_con = document.createElement('div')
            const regist_button = document.createElement('button')
            const list_button = document.createElement('button')

            write_section.appendChild(write_con)
            write_con.append(hr01, head_con, hr02, title_con, content_con, writer_con, image_con, hr03, button_con, hr04)
            head_con.append(icon_span, head_span)
            title_con.append(title_span, title_input)
            content_con.append(content_span, content_input)
            writer_con.append(writer_span, writer_input)
            image_con.append(image_span, image_select)
            button_con.append(regist_button, list_button)
            image_select.append(image_option_none, image_option01, image_option02, image_option03)

            Object.assign(hr01, {
                className: "write_hrs"
            })
            Object.assign(hr02, {
                className: "write_hrs"
            })
            Object.assign(hr03, {
                className: "write_hrs"
            })
            Object.assign(hr04, {
                className: "write_hrs"
            })
            // 선

            Object.assign(write_con, {
                id: "write-write-con",
                className: "write_write_con"
            })
            Object.assign(head_con, {
                className: "write_head_con"
            })
            Object.assign(icon_span, {
                id: "write-icon-span",
                textContent: "따봉"
            })
            Object.assign(head_span, {
                id: "write-head-span",
                textContent: "글작성"
            })
            Object.assign(title_con, {
                className: "write_middle_con"
            })
            Object.assign(title_span, {
                className: "write_middle_span",
                innerHTML: "&emsp;제목"
            })
            Object.assign(title_input, {
                className: "write_middle_input",
                placeholder: "제목을 입력하세요."
            })
            Object.assign(content_con, {
                className: "write_middle_con"
            })
            Object.assign(content_span, {
                className: "write_middle_span",
                innerHTML: "&emsp;내용"
            })
            Object.assign(content_input, {
                id: "write-content-input",
                placeholder: "내용을 입력하세요."
            })
            Object.assign(writer_con, {
                className: "write_middle_con"
            })
            Object.assign(writer_span, {
                className: "write_middle_span",
                textContent: "작성자"
            })
            Object.assign(writer_input, {
                className: "write_middle_input",
                placeholder: "닉네임을 입력하세요."
            })
            Object.assign(image_con, {
                className: "write_middle_con"
            })
            Object.assign(image_span, {
                className: "write_middle_span",
                id: "write-image-span",
                textContent: "이미지"
            })
            Object.assign(image_select, {
                id: "write-image-select"
            })
            Object.assign(image_option_none, {
                class: "write_image_option",
                textContent: "이미지 없음"
            })
            Object.assign(image_option01, {
                class: "write_image_option",
                textContent: "이미지01"
            })
            Object.assign(image_option02, {
                class: "write_image_option",
                textContent: "이미지02"
            })
            Object.assign(image_option03, {
                class: "write_image_option",
                textContent: "이미지03"
            })
            Object.assign(button_con, {
                className: "write_button_con"
            })
            Object.assign(regist_button, {
                id: "write-regist-button",
                textContent: "등록"
            })
            Object.assign(list_button, {
                id: "write-list-button",
                textContent: "목록"
            })

            const data_box = localLoad()
            let count
            // 고유넘버
            if (data_box.length == 0) {
                count = 0
                // 스토리지에 데이터가 없으면 0(1)부터 다시 시작
            } else {
                count = data_box[data_box.length - 1].id_num
                // 스토리지에서 받은 데이터(배열)의 마지막 요소의 id_num을 받아
                // count가 겹치지 않게 
            }

            // 글 작성 버튼
            regist_button.addEventListener('click', (event) => {
                if(title_input.value.length<2){
                    window.confirm('제목은 두글자 이상이어야 합니다.')
                }
                else{
                    if (window.confirm('작성하신 글을 게시하시겠습니까?')) {
                        count++
                        let now = new Date();
                        // id_num 1부터 시작합니다.
                        const data = {
                            id_num: count,
                            title: title_input.value,
                            views: 0,
                            writer: writer_input.value,
                            date: now,
                            content: content_input.value,
                        }
                        // 스토리지에 고유 넘버, 제목, 조회수, 작성자, 시간, 내용 저장
                        data_box.push(data)
                        localSave(data_box)
                        // 스토리지에 저장하고 바로 창 삭제??
                        write_section.removeChild(write_con)
                        notice_board_create()
                    }
                }
            })

            list_button.addEventListener('click', (event) => {
                if (window.confirm('작성하신 글을 게시하지 않습니다. 게시판으로 돌아갑니다.')) {
                    write_section.removeChild(write_con)
                    notice_board_create()
                }
            })
        }
    })
    // 글작성 버튼 끝

})
