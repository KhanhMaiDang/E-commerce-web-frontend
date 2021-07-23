const data = {
    products: [
        {
            _id: '3',
            name: 'Cho tôi xin một vé đi tuổi thơ',
            author: 'Nguyễn Nhật Ánh',
            publisher: 'NXB Trẻ',
            category: 'Truyện dài',
            image: '/images/cho-toi-xin-mot-ve-di-tuoi-tho.jpg',
            price: (53000).toLocaleString('vi', { style: 'currency', currency: 'VND' }),
            remaining: 100,
            rating: 4.5,
            numReviews: 5,
            description: 'Truyện Cho tôi xin một vé đi tuổi thơ là sáng tác mới nhất của nhà văn Nguyễn Nhật Ánh. Nhà văn mời người đọc lên chuyến tàu quay ngược trở lại thăm tuổi thơ và tình bạn dễ thương của 4 bạn nhỏ. Những trò chơi dễ thương thời bé, tính cách thật thà, thẳng thắn một cách thông minh và dại dột, những ước mơ tự do trong lòng… khiến cuốn sách có thể làm các bậc phụ huynh lo lắng rồi thở phào. Không chỉ thích hợp với người đọc trẻ, cuốn sách còn có thể hấp dẫn và thực sự có ích cho người lớn trong quan hệ với con mình. '
        },
        {
            _id: '2',
            name: 'Bến Xe (Tái Bản 2020)',
            author: 'Thương Thái Vi',
            publisher: 'Đinh Tị',
            description: 'Bến Xe \n Thứ tôi có thể cho em trong cuộc đời này \n chỉ là danh dự trong sạch\nvà một tương lai tươi đẹp mà thôi.\n Thế nhưng, nếu chúng ta có kiếp sau,\nnếu kiếp sau tôi có đôi mắt sáng,\ntôi sẽ ở bến xe này… đợi em.',
            price: 56500,
            remaining: 100,
            image: '/images/ben-xe.jpg',
            category: 'Truyện ngắn-Tản văn- Tạp văn',
            rating: 3.0,
            numReviews: 5
        },
        {
            _id: '4',
            name: 'Muôn Kiếp Nhân Sinh 2',
            author: 'Nguyên Phong',
            publisher: 'Nhà Xuất Bản Tổng hợp TP.HCM',
            description: 'CUỐN SÁCH CỦA NHỮNG CÁNH BƯỚM RUNG ĐỘNG \n Tác phẩm Muôn Kiếp Nhân Sinh tập 1 của tác giả Nguyên Phong xuất bản giữa tâm điểm của đại dịch đã thực sự tạo nên một hiện tượng xuất bản hiếm có ở Việt Nam. Cuốn sách đã khơi dậy những trực cảm tiềm ẩn của con người, làm thay đổi góc nhìn cuộc sống và thức tỉnh nhận thức của chúng ta giữa một thế giới đang ngày càng bất ổn và đầy biến động. Ngoài việc phát hành hơn 200.000 bản trong 6 tháng, chưa kể lượng phát hành Ebook và Audio Book qua Voiz-FM, First News còn nhận được hàng ngàn tin nhắn, e-mail chuyển lời cảm ơn đến tác giả Nguyên Phong. Điều này chứng tỏ sức lan tỏa của cuốn sách đã tạo nên một hiện tượng trong văn hóa đọc của năm 2020.',
            price: 183500,
            remaining: 100,
            image: '/images/muonkiepnhansinh2-bia-01.jpg',
            category: 'Sách Tôn Giáo - Tâm Linh',
            rating: 3.5,
            numReviews: 5
        },
        {
            _id: '5',
            name: 'Dấu chân trên cát',
            author: 'Nguyên Phong',
            publisher: 'Nhà Xuất Bản Tổng hợp TP.HCM',
            description: 'Dấu chân trên cát là tác phẩm được dịch giả Nguyên Phong phóng tác kể về xã hội Ai Cập thế kỷ thứ XIV trước CN, qua lời kể của nhân vật chính - Sinuhe.',
            price: 93000,
            remaining: 100,
            image: '/images/dau-chan-tren-cat.jpg',
            category: 'Sách Tôn Giáo - Tâm Linh',
            rating: 5.0,
            numReviews: 5
        },
        {
            _id: '6',
            name: 'Sự Im Lặng Của Bầy Cừu (Tái Bản)',
            author: 'Thomas Harris',
            publisher: 'Nhã Nam',
            description: 'Những cuộc phỏng vấn ở xà lim với kẻ ăn thịt người ham thích trò đùa trí tuệ, những tiết lộ nửa chừng hắn chỉ dành cho kẻ nào thông minh, những cái nhìn xuyên thấu thân phận và suy tư của cô mà đôi khi cô muốn lảng trá Clarice Starling đã dấn thân vào cuộc điều tra án giết người lột da hàng loạt như thế, để rồi trong tiếng bức bối của chiếc đồng hồ đếm ngược về cái chết, cô phải vật lộn để chấm dứt tiếng kêu bao lâu nay vẫn đeo đẳng giấc mơ mình: tiếng kêu của bầy cừu sắp bị đem đi giết thịt.',
            price: 75800,
            remaining: 100,
            image: '/images/su-im-lang-cua-bay-cuu.jpg',
            category: 'Truyện dài',
            rating: 3.0,
            numReviews: 5
        },
        {
            _id: '7',
            name: 'Giết Con Chim Nhại (Tái Bản)',
            author: 'Harper Lee',
            publisher: 'Nhã Nam',
            description: 'Nào, hãy mở cuốn sách này ra. Bạn phải làm quen ngay với bố Atticus của hai anh em - Jem và Scout, ông bố luật sư có một cách riêng, để những đứa trẻ của mình cứng cáp và vững vàng hơn khi đón nhận những bức xúc không sao hiểu nổi trong cuộc sống. Bạn sẽ nhớ rất lâu người đàn ông thích trốn trong nhà Boo Radley, kẻ bị đám đông coi là lập dị đã chọn một cách rất riêng để gửi những món quà nhỏ cho Jem và Scout, và khi chúng lâm nguy, đã đột nhiên xuất hiện để che chở. Và tất nhiên, bạn không thể bỏ qua anh chàng Tom Robinson, kẻ bị kết án tử hình vì tội hãm hiếp một cô gái da trắng, sự thật thà và suy nghĩ quá đỗi đơn giản của anh lại dẫn đến một cái kết hết sức đau lòng, chỉ vì lý do anh là một người da đen.',
            price: 106500,
            remaining: 0,
            image: '/images/giet-con-chim-nhai.jpg',
            category: 'Truyện dài',
            rating: 2.5,
            numReviews: 5
        },
    ]
}
export default data;