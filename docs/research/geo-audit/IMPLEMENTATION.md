# Những thay đổi đã triển khai trong code

Ngày: 28/10/2026. Tài liệu này ghi đợt chuẩn bị code đầu tiên. **Trạng thái release production mới nhất nằm trong RELEASE.md.** REPORT.md và snapshot.json là baseline trước sửa; không phải kết quả sau triển khai. Không gửi email/WhatsApp/enquiry thật trong các kiểm tra.

## SEO và bảo toàn nội dung

- Canonical của các trang độc lập trỏ về chính URL đó, không nhận canonical trang chủ sai từ CMS. Không đặt canonical chung ở root layout.
- Blog chỉ redirect 308 khi body rỗng và có travel guide cùng slug có nội dung. Blog riêng có body vẫn render và canonical riêng. Listing blog dẫn tới nội dung thật.
- Giữ đủ **50 URL itinerary** bằng cách hợp nhất 47 tour trong catalogue local với 5 bản CMS, CMS ưu tiên khi trùng slug. Tour cũ được ghi rõ là sample/archived guide price, cần xác nhận hoạt động và báo giá.
- Chỉ hiển thị các ngày/hoạt động có trong timeline nguồn; bỏ sinh tự động lịch theo giờ, VIP access, món ăn và khách sạn không được dữ liệu xác nhận.
- Sitemap không trùng URL, có đủ **6 khách sạn**, loại enquiry noindex và các blog redirect. Chỉ dùng lastmod có nguồn; không tự đặt ngày mới cho mọi trang.
- Một nguồn robots tại `src/app/robots.ts`, giữ crawl nội dung công khai và loại API/studio. Studio có noindex; `/about` redirect về `/our-story`.
- Metadata bổ sung cho khách sạn/chuyên gia, sửa hai H1 ở các listing, sửa link footer sai. Article/Breadcrumb JSON-LD cho travel guides; escape dữ liệu JSON-LD và dùng đúng logo website.
- Public CMS fetch làm mới theo 60 giây, tránh giữ thiếu inventory do cache live cũ; preview dùng perspective drafts. Không cấp write token cho browser live preview.

## E‑E‑A‑T và nội dung hỗ trợ quyết định

- Bỏ ngày “verified” tự lấy thời điểm build, bỏ nhãn chuyến khảo sát tự gán trong fallback và các phát ngôn specialist hardcode đã nhận diện. Không thêm tác giả hay chứng nhận giả.
- Thêm object CMS `editorialEvidence` cho cả 7 loại bài: author, reviewer, lastReviewedAt, source URL/date và field visit/evidence URL. Public UI chỉ hiện dữ liệu có thật; ngày review yêu cầu có reviewer. Cần biên tập viên điền sau khi kiểm chứng.
- Sửa phí e-visa, passport-validity wording, bỏ hứa xét duyệt trong 24 giờ và chỉ dẫn extension/entry points quá rộng; có nguồn chính phủ và ngày tham chiếu cố định.
- Sửa Amanoi/Vinh Hy trong bài luxury; có link resort chính thức. Sửa các câu sai tuyến/địa danh đã nhận diện trong bài 14 ngày và giải thích giờ Việt Nam/UK theo mùa.
- Các sửa PortableText nằm trong `editorialCorrections.ts`, áp dụng khi đọc, không ghi đè CMS. Sau khi biên tập nguồn gốc, có thể xóa dần lớp tương thích này.
- Thêm bảng ba vùng và gợi ý route có điều kiện cho đủ 12 month guides; nguồn khí hậu chính thức, câu hỏi về ngân sách, gia đình, lịch nghỉ và phương án thời tiết.
- CTA từ bài/tour gửi kèm chủ đề `interest`; khách nhìn thấy chủ đề trên form. Các nguồn đã tham khảo không được dùng để khẳng định đã fact-check toàn bộ bài.
- Bỏ badge affiliation BBB/USTOA/IATA chưa được xác nhận ở footer và claim “#1 Tour Operator”. Các claim/review/credentials khác chưa có hồ sơ vẫn thuộc backlog cần doanh nghiệp xác nhận.

## Lead và attribution

- Backend validate contact, traveller counts và submission ID trước khi giao lead. Giữ destination, travelYear, availableTime và chủ đề quan tâm.
- Chỉ trả success nếu CMS lưu được hoặc email có cả HTTP và application acknowledgement. Nếu cả hai thất bại, trả 503; client không tự báo thành công hoặc gửi fallback không được kiểm tra.
- Submission UUID tạo document ID ổn định. Retry khi đã có document không lưu thêm hoặc gửi lại email. Với đường chỉ có email, chưa có kho idempotency bền vững; không bảo đảm exactly-once nếu mạng mất response. Không đánh đồng HTTP ACK với email đã tới inbox.
- Phân loại AI theo hostname/UTM kiểm soát; phân biệt observed_referral/campaign/unknown. Markdown/footnote là content hint riêng, không được tính thành AI acquisition. Không còn confidence 98–100% chưa hiệu chuẩn.
- Events `article_cta_click`, `form_start`, `lead_accepted`, `whatsapp_click`; không gửi contact/notes/query tùy ý vào analytics. WhatsApp click không phải lead accepted. Các event client có thể bị chặn; không thay CRM booking/revenue tracking.
- Gỡ credential literal ở 6 script và chuyển sang `SANITY_WRITE_TOKEN`. **Token đã từng lộ trong Git vẫn cần chủ tài khoản thu hồi/thay**, vì xóa literal không thu hồi quyền của token cũ.

## Kiểm tra

- `npm run build`: đạt.
- `npm run typecheck`: đạt.
- `npm run test:geo`: **12/12 đạt** — spoofed referrers, attribution, form validation, delivery failures/fallback/retry, JSON-LD escaping, catalogue parity và timeline không bịa hoạt động.
- `npm run check:geo` với server build local: **129 URL sitemap HTTP 200, canonical của chính trang, không noindex và một H1**, đủ 50 tour + 6 khách sạn; kiểm tra 14 blog 308, Article schema, bảng theo tháng, robots và request enquiry không hợp lệ trả 400.
- Lint cho các module/component mới và các phần enquiry mới viết: đạt. Lint toàn repository vẫn còn lỗi có sẵn; baseline trước sửa có 444 errors; sau sửa còn 428 errors, chủ yếu explicit-any và các vấn đề đã có trong code cũ. Không thể coi `npm run check` toàn repo đã đạt. Kết quả sau cùng nằm trong phần bàn giao của chat.
- Không thực hiện kiểm thử gửi lead thật, đo Core Web Vitals, kiểm tra index bằng Search Console hoặc benchmark citation AI thực. Log `local-verification.json` chứng minh bản local, không chứng minh production đã thay đổi.

## Việc còn cần dữ liệu hoặc quyền từ doanh nghiệp

1. Xác nhận pháp nhân trong terms/privacy/our-story và tên thương hiệu; giấy phép, địa chỉ, profile người thật, nguồn giải thưởng và review. Các hợp đồng/chính sách chưa được viết lại dựa trên suy đoán.
2. Cung cấp field notes/ảnh gốc/ngày khảo sát và người review để điền CMS; kiểm chứng các claim UNESCO/CNN/quote, provider và giá còn lại trong ARTICLE_REVIEW.md.
3. Báo giá và inclusions/exclusions hiện hành cho các tour; xác nhận quyền sử dụng và tính còn bán của catalogue cũ. Catalogue đã được giữ URL, chưa được chứng nhận còn hoạt động.
4. Kiểm tra activation/configuration email và token CMS bằng môi trường test được phép gửi; nối CRM qualified→quote→booked→revenue. Backend đã có failure handling nhưng audit không gửi thông báo tới người thật.
5. Sau deploy, chạy lại crawl production, kiểm tra redirect/cache/CDN; dùng Search Console/Bing/log và bộ prompt chuẩn để lập baseline rồi mới đánh giá lead AI thực.

Thay đổi sẵn sàng review trong workspace. Không được báo “đã đạt E‑E‑A‑T” hoặc “chắc chắn có lead AI” chỉ dựa trên các kiểm tra kỹ thuật này.
