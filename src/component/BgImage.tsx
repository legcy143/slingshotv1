import React from 'react'

function BgImage() {
    let bgImage = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_ljaKaMuO-Whe_F_rbT8PA9KgRr4SIDoIA&usqp=CAU",
        "https://img.freepik.com/free-vector/clean-medical-background_53876-97927.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=ais",
        "https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=ais",
    ]
    return (
        <div className={'fixed top-0 right-0 w-[100vw] h-[100vh] opacity-30'}>
            <img className='w-full h-full' src={bgImage[2]} alt="" />
        </div>
    )
}

export default BgImage