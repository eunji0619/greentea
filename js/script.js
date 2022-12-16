document.addEventListener('DOMContentLoaded', () => {
    const home_button = document.getElementById("home-button")
    const list_button = document.getElementById("lists-button")
    const write_button = document.getElementById("write-button")

// 글작성 버튼 시작
    write_button.addEventListener('click', (event) => {
        // 글작성 창이 하나만 뜨게
        if (!document.getElementById('write-write-con')) {
            const write_section = document.getElementById('write-section')
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
                }
            })

            list_button.addEventListener('click', (event) => {
                if (window.confirm('작성하신 글을 게시하지 않습니다. 게시판으로 돌아갑니다.')) {
                    write_section.removeChild(write_con)
                    // 창 삭제 후 -> 목록 창 생성 or 메인 화면
                }
            })
        }
    })
// 글작성 버튼 끝

    // // ex) data.length가 45일때
    // for (let i = 0; i < data.length / 10; i++) {
    //     // 어차피 <=가 아닌 < 이거 니까 나누기 10 했을때 소수점을 생각할 필요가 없다.
    //     const list_num = document.createElement('span')
    //     lists_footer.appendChild(list_num)
    //     // 하단에 숫자 부여
    //     list_num.textContent = `${data.length / 10 - data.length % 10 + 1 - i}`
    //     // 보통 역순으로 표시되니까 ex) 5 4 3 2 1
    //     list_num.addEventListener('click', (event) => {
    //         lists_div.removeChild(lists_middle)
    //         // 작성하기 전에 전 게시글들을 지우고
    //         for (let j = data.length - 1; j > data.length - 1 - (10 * (i + 1)); j--) {
    //             data[j] //data[j]에서 뽑아낸 데이타로 한 줄 작성
    //             // 이걸 10번 반복 ex) 45~36까지
    //         }
    //     })
    //     // 5번이라는 span에 게시글 45~36번까지 게시글을 10개 생성하는 이벤트가 부여
    //     // 5라고 적혀있지만 첫번째 버튼, 다섯번째 버튼까지 작성
    // }

  
})
