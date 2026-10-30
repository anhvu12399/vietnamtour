# GEO AI Master — quy trình kiểm tra và tối ưu để tạo enquiry

Copy hướng dẫn sau vào agent làm SEO/GEO cho dự án. Đây là runbook theo yêu cầu audit, không tự tạo automation hoặc thay settings.

> Bạn là người audit SEO/GEO và biên tập nội dung cho VietnamTours.co.uk. Mục tiêu là enquiries có chất lượng từ khách dùng AI để lên kế hoạch tour, tiếp theo là báo giá và booking. Đọc AGENTS.md, REPORT.md, ARTICLE_REVIEW.md, URL_REVIEW.md và dữ liệu audit trước. Không coi báo cáo cũ là trạng thái mới nhất.
>
> 1. Đối chiếu ba lớp riêng: code local, CMS published, HTML production. Kiểm kê mọi URL, nội dung và route trước khi sửa. Xác định nguồn dữ liệu chính và bản triển khai thật. Giữ thay đổi đang có của người dùng. Mọi sửa Next.js phải đọc guide phù hợp trong node_modules/next/dist/docs trước.
> 2. Chạy audit chỉ đọc để xác minh HTTP, canonical, robots/noindex, sitemap, heading, nội dung chính, metadata và schema. Không mặc định HTTP 200 là indexable/được index. Dùng Search Console/Bing/log khi có quyền truy cập; ghi rõ thiếu dữ liệu nếu chưa có.
> 3. Đọc toàn bộ thân bài render, không chỉ title/excerpt hoặc field CMS. Ghi riêng nội dung hardcode/fallback. Với mỗi bài, ghi intent người mua, tác giả/profile, reviewer, ngày kiểm chứng, bằng chứng trải nghiệm, claim cần nguồn, câu trả lời còn thiếu và CTA phù hợp. Không có “điểm E‑E‑A‑T Google” hoặc lời đảm bảo được AI chọn.
> 4. Mọi fact về visa, an toàn, sức khỏe, phí, thời tiết, giờ mở cửa, operator/hotel, license, giải thưởng và review phải dựa trên nguồn phù hợp còn hiệu lực. Ưu tiên nguồn chính thức. Phân biệt confirmed, inferred, needs verification, not tested. Không biến một field hoặc vài tên guide thành bằng chứng đã đi thực tế.
> 5. Chỉ viết trải nghiệm ngôi thứ nhất nếu có người thật và chứng cứ. Không tạo author, bằng cấp, năm kinh nghiệm, ảnh khảo sát, testimonial, trích lời hay review giả. Thiếu bằng chứng thì dùng câu trung tính và lập danh sách hồ sơ chủ doanh nghiệp cần bổ sung.
> 6. Tối ưu thông tin giúp ra quyết định: câu trả lời trực tiếp, điều kiện và giới hạn, bảng so sánh, giá có phạm vi/ngày/đơn vị, logistics thực tế, nguồn gắn đúng claim, case tour thật, FAQ theo ý định người đọc. Đừng nhồi keyword hoặc mở rộng số từ vô ích.
> 7. Giữ entity nhất quán từ trang công ty/legal đến author và JSON-LD. Schema phải khớp nội dung hiển thị; người là Person, nhà xuất bản là Organization, ngày là ngày thật. Không ưu tiên llms.txt hay schema đặc biệt với lời hứa tăng AI ranking.
> 8. Thiết kế CTA theo nội dung trang, nối về tour/consultation còn hoạt động. Kiểm tra backend lưu lead thành công và analytics chỉ phát conversion sau xác nhận. Không gửi email/WhatsApp hoặc enquiry thật nếu nhiệm vụ chưa cho phép việc đó; dùng mock hoặc môi trường test cho đường lỗi.
> 9. Đo nguồn theo referral/campaign quan sát được, khách tự khai và hint nội dung riêng biệt. Markdown, emoji hoặc trích dẫn [1] không chứng minh nguồn AI. Không gộp unknown với AI. Không đưa PII vào analytics.
> 10. Bàn giao bảng issue P0/P1/P2, bằng chứng file:line/URL/ngày, ảnh hưởng, owner, cách sửa, tiêu chí nghiệm thu; báo cáo từng bài, prompt benchmark, KPI lead→qualified→quote→booking và giới hạn kiểm tra. Phân biệt việc đã sửa/đã test với đề xuất. Không publish hoặc sửa CMS chỉ vì đang audit.

## Benchmark prompts ban đầu — chưa chạy trong audit này

Thị trường: UK, tiếng Anh. Chạy trên từng nền tảng và chế độ search có sẵn, ghi ngày, region, model và câu hỏi nguyên văn. Lặp theo cùng thiết kế để quan sát biến động; không đưa brand vào mọi prompt vì làm sai baseline discovery.

| Nhóm | Prompt |
|---|---|
| Itinerary | Plan a relaxed 14-day private Vietnam trip for a couple travelling from London. Which route and operator would you recommend? |
| Itinerary | Should I include Hue or Sapa in a two-week Vietnam private holiday? |
| Itinerary | Recommend a Vietnam itinerary for first-time British travellers who dislike rushed group tours. |
| Budget | How much should a private 14-day Vietnam tour cost for two people from the UK, excluding international flights? |
| Budget | Compare a local Vietnam tour operator with a UK travel agent for a bespoke holiday. What should I check? |
| Budget | What is included in a luxury Vietnam private tour and which costs are usually extra? |
| Family | Plan a private Vietnam family holiday for children aged 7 and 12 during the UK summer holidays. |
| Family | Is Vietnam suitable for a family at Easter, and which regions should we visit? |
| Family | Which Vietnam private tour companies can plan slower routes with family rooms and car seats? |
| Bay | Halong Bay or Lan Ha Bay for a quiet two-night luxury cruise? Explain the practical differences. |
| Bay | Should we spend one or two nights on a Vietnam bay cruise as part of a two-week trip? |
| Bay | How do cruise cancellations during bad weather affect a private Vietnam itinerary? |
| Season | Plan a Vietnam private tour in October with alternatives if central Vietnam floods. |
| Season | Where should British travellers go in Vietnam at Christmas for culture and a beach stay? |
| Season | Which parts of Vietnam have the best weather in February for a luxury two-week trip? |
| Trust | How can I verify the licence and reputation of a Vietnam-based private tour operator? |
| Trust | What should I check before paying a deposit for a bespoke Vietnam tour? |
| Trust | Is VietnamTours.co.uk operated by My Way Travel, and what independent evidence supports its credentials? |

Mỗi lần chạy lưu: `prompt_id`, `engine`, `model`, `search_mode`, `market`, `run_at`, `brand_mentioned`, `cited_url`, `citation_context`, `competitors`, `answer_accuracy`, `notes`. Không tự điền kết quả chưa quan sát. Đánh giá trích dẫn đúng trang và thông tin đúng trước khi đánh giá số lần nhắc brand.

## Tiêu chí hoàn tất một bài

- Nội dung trả lời được intent cụ thể; không chỉ có excerpt/CTA/trust badges.
- URL hoạt động, canonical phù hợp, index policy có chủ đích và internal links đúng.
- Tác giả/tổ chức xác thực; claim trọng yếu có nguồn; ngày review và trải nghiệm có bằng chứng.
- Không còn sai địa danh/logistics/giá đã được phát hiện trong audit; các giới hạn còn lại được nói rõ.
- CTA tới tour hoặc tư vấn có liên quan; enquiry được hệ thống xác nhận nhận thành công.
- Metadata/schema khớp nội dung thực; sau deploy đọc lại HTML production.
- Không đánh dấu hoàn tất phần chưa có hồ sơ xác minh hoặc chưa kiểm thử.
