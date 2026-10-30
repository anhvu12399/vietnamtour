# Audit SEO, GEO và E‑E‑A‑T — VietnamTours.co.uk

Ngày kiểm tra: **28/10/2026**. Mục tiêu: tăng cơ hội được AI tìm thấy, dẫn nguồn và giới thiệu đúng đối tượng để tạo enquiry có chất lượng.

## Kết luận

**Chưa đủ cơ sở để coi nội dung đã đáp ứng E‑E‑A‑T cho mục tiêu tạo lead từ AI.** Website có nội dung tiếng Anh, tour, CTA, FAQ, trang chuyên gia và một số chi tiết vận hành hữu ích. Điểm nghẽn lớn nhất hiện tại là canonical ở production, nội dung blog rỗng trong CMS, bằng chứng chuyên môn chưa kiểm chứng được và đo lường lead chưa đáng tin cậy.

Đây là kết luận audit theo tiêu chí biên tập của dự án. Google không cung cấp chứng nhận “đạt E‑E‑A‑T” hay điểm E‑E‑A‑T chính thức cho từng bài. Không suy ra rằng một bài ít chữ chắc chắn kém chất lượng; cần xét mức độ trả lời đủ nhu cầu, độ chính xác và bằng chứng.

## Phạm vi và giới hạn

- Crawl **136 mục sitemap (134 URL duy nhất, hai URL bị lặp)**, mở rộng thành **145 URL** từ sitemap, CMS, dữ liệu local và trang kiểm chứng liên quan. **144 HTTP 200, một HTTP 404 là `/about`**. Toàn bộ 134 URL sitemap duy nhất trả HTTP 200 ở lần kiểm tra này.
- Kiểm kê **83 mục nội dung**: 52 bản ghi CMS công khai và 31 bài local. Trong đó có **45 bài/chủ đề biên tập** gồm 14 travel guide, 6 things-to-do, 8 trip idea, 5 inspiration, 12 month guide; thêm 14 bản blog cùng slug và 24 mục tour/địa điểm/khách sạn/chuyên gia.
- Đọc cấu trúc route, metadata, schema, truy vấn CMS, nội dung công khai, CTA và code attribution/form hiện tại. Có danh sách riêng cho từng bài trong `ARTICLE_REVIEW.md` và từng URL trong `URL_REVIEW.md`.
- Crawl dùng HTTP GET và phân tích HTML; không phải chạy trình duyệt, kiểm tra mobile hay đo Core Web Vitals. Các kiểm tra tự động về field/URL không chứng minh sự thật của nội dung.
- Chưa có Search Console, Bing Webmaster, GA4, log CDN hay dữ liệu CRM: **chưa xác định được số trang thực sự được index, tần suất AI crawl, số lần được AI dẫn nguồn hay số lead AI hiện có**. Không dùng kết quả `site:` để thay số index.
- Không gửi enquiry thử, email hay WhatsApp. Không thay nội dung CMS, sửa website đang chạy hoặc deploy. Giữ nguyên các file người dùng đang sửa.

## Các lỗi ưu tiên

| Mức | Phát hiện có bằng chứng | Ảnh hưởng tới lead AI | Hành động và điều kiện nghiệm thu |
|---|---|---|---|
| P0 | **78/134 URL sitemap duy nhất có canonical khác URL trả về; 76 trỏ về trang chủ**: 50 itinerary, 11 destination, 13 travel guide, terms và privacy. Hai blog trỏ về travel guide. Sitemap còn lặp hai URL của bài 2-week-vietnam-itinerary-private-tour (blog và travel-guide). | Gửi tín hiệu hợp nhất nội dung sai; làm yếu khả năng tìm đúng trang có câu trả lời và CTA phù hợp. Canonical là tín hiệu, không chứng minh Google đã loại trang. | Sửa canonical ở nguồn thực sự sinh metadata, deploy rồi crawl lại. Mỗi trang độc lập có canonical của chính nó; chỉ hợp nhất bản trùng tương đương. |
| P0 | **14/14 `blogPost` trong CMS có `content: []` và không có author reference**. Bản live của bài best-places-2026 vẫn có nội dung/tác giả, nhưng 13 blog còn lại chủ yếu hiện excerpt, thẻ trust và related posts. | Tạo nhiều trang giống bài viết nhưng thiếu câu trả lời chính. Nội dung hiện ngoài web không được bảo toàn đầy đủ trong CMS. | Chọn nguồn nội dung chính; khôi phục body có nguồn gốc rõ ràng; so diff nội dung render trước/sau. Không deploy code hiện tại trước khi bảo toàn phần live còn giá trị. |
| P0 | **Code local và production khác nhau**: local blog đặt `noindex` + canonical về travel guide; live blog đang indexable, phần lớn có canonical của chính nó. | Sửa hoặc triển khai ngay có thể làm mất URL đang có giá trị và thay đổi khả năng index. | Chốt build/ref đang chạy và URL chính theo từng slug, lập bảng redirect. Không áp dụng quy tắc canonical hàng loạt trước khi so body. |
| P0 | `new Date()` được dùng cho dòng “Information last verified and updated”; thẻ “all visited within 12 months”, “reviewed every quarter” dùng chung. | Khẳng định kiểm chứng không gắn với lần kiểm chứng thực tế; gây mâu thuẫn khi AI đối chiếu. | Thay bằng `lastReviewedAt`, người kiểm chứng, nguồn, ngày khảo sát thực tế. Không tự sinh trải nghiệm hoặc năm kinh nghiệm. `_updatedAt` không đồng nghĩa đã fact-check. |
| P0 | Danh tính tổ chức chưa thống nhất: VietnamTours, Vietnam Heritage Tours Ltd trong terms, My Way Travel trên our-story; schema local ghi GB/London trong khi nội dung nói trụ sở HCMC. | AI khó xác định ai bán tour, ai chịu trách nhiệm và ai có chuyên môn. | Xác nhận pháp nhân/chủ thương hiệu/địa chỉ/phạm vi phục vụ. Đồng bộ legal, footer, contact, schema và hồ sơ bên ngoài. Không tự suy ra công ty đăng ký UK từ tên miền `.co.uk`. |
| P0 | Endpoint enquiry local vẫn trả `success: true` khi CMS không lưu được và email không xác nhận thành công; `fetch` email không kiểm tra HTTP/body. | Có thể mất enquiry thật và ghi nhận conversion sai. | Chỉ báo thành công sau khi ít nhất một kênh lưu bền vững xác nhận nhận lead; phản hồi lỗi thật, kiểm soát gửi lặp; kiểm thử failure path bằng mock trước, không gửi email thật trong audit. |
| P1 | `trafficDetector.ts` gán 98% “AI” từ Markdown, bảng và `[1]`; nhận diện URL bằng substring, thiếu alias UTM như `chatgpt`; medium/campaign không được dùng trong phân loại. | KPI AI lead dễ bị thổi phồng; khách copy lịch trình không chứng minh được nguồn acquisition. | Tách `observed_referral`, `campaign`, `self_reported`, `content_hint`, `unknown`. Parse hostname và alias có kiểm soát; bỏ confidence giả định chưa hiệu chuẩn. |
| P1 | `/about` được liên kết trong author card nhưng live trả 404. | Đứt đường xác minh tác giả/tổ chức. | Dùng `/our-story` hoặc URL hồ sơ người thật thích hợp. Nghiệm thu mọi link trust quan trọng trả đúng trang. |
| P1 | 31 bài local không có field tác giả/ngày review; 14 post chỉ một bài có heroAuthor. Không thấy URL nguồn ngoài trong phần body của các nguồn dữ liệu được kiểm kê. | Có lời khuyên nhưng thiếu provenance, đặc biệt với visa, khí hậu, giá và giải thưởng. | Bổ sung nguồn cho từng claim thay đổi theo thời gian, byline/profile người thật, hồ sơ field trip. Một bài render hardcode có link evisa là ngoại lệ; kiểm kê CMS không phản ánh đầy đủ ngoại lệ này. |
| P1 | Không phát hiện Article JSON-LD trên cả 14 URL travel guide live; local component ArticleJsonLd luôn dùng Organization ngay cả khi truyền tên người. | Máy đọc được ít thông tin nhất quán về tác giả/ngày bài. Đây không phải điều kiện bắt buộc để được AI trích dẫn. | Sau khi xác minh danh tính, dùng Person cho tác giả người thật với URL profile; publisher Organization; ngày thật; nội dung schema khớp nội dung hiển thị. |
| P1 | Month guides có phần sections chỉ khoảng **54–285 từ**, nhiều tháng chỉ 1 đoạn, không có nguồn khí hậu trong body. | Chưa trả lời đủ câu hỏi quyết định mua tour theo mùa và theo vùng. | Thêm bảng vùng/tháng, mức độ mưa/nóng và bất định, lựa chọn thay thế, kỳ nghỉ UK, lịch trình phù hợp và nguồn dữ liệu có giai đoạn tham chiếu. Không đặt mục tiêu số từ máy móc. |
| P1 | Chưa thấy event riêng cho form_start, CTA, WhatsApp và lead_accepted; chỉ có nền tảng analytics và lưu referral ở session. | Không nối được bài được AI dẫn nguồn với enquiry chất lượng và doanh thu. | Đo funnel và chất lượng lead; lưu landing page/nguồn bằng chứng/lead ID. Dữ liệu khách hàng không đưa vào event analytics công khai. |
| P2 | Title có đoạn bị cắt giữa chữ như `| Vie`, thêm thương hiệu lặp; accommodations và destinations listing có hai H1. Hai nguồn robots: `public/robots.txt` và `src/app/robots.ts`. | Giảm sự rõ ràng của tên trang và tăng rủi ro cấu hình lệch; không phải lỗi quyết định riêng lẻ. | Viết title ngắn có chủ đích, một H1 chính; chọn một nguồn robots, kiểm tra build và file thực tế sau deploy. |

Lưu ý triển khai quan trọng: live có **50 itinerary**, CMS hiện chỉ có **5** và code route local chỉ đọc CMS. Sitemap local cũng đang bỏ accommodations với comment “0 documents” trong khi CMS hiện có **6**. Cần đối chiếu đủ URL production trước khi deploy để tránh mất 45 tour hoặc bỏ sót inventory khách sạn.

Phát hiện bổ sung trong repository: `scripts/check-sanity-seo.mjs` chứa token viết trực tiếp trong source đã được Git theo dõi. Không sao chép token vào báo cáo. Cần thu hồi/thay token, chuyển sang biến môi trường và xem lại lịch sử Git; không chạy các script sửa CMS trong quá trình audit.

## E‑E‑A‑T hiện thiếu gì?

| Thành phần | Đã có | Thiếu bằng chứng để xác nhận |
|---|---|---|
| Experience | Ngôi kể trải nghiệm, vài tên guide, thời gian tham quan và mẹo cụ thể. | Ai thực sự đi, ngày đi, ảnh gốc/field note, tour thực tế, bản ghi khảo sát và sự đồng ý công bố. Không coi văn phong “tôi đã đến” là bằng chứng. |
| Expertise | Có specialist pages và nhiều nội dung mô tả tuyến. | Tác giả gắn đúng bài, profile đầy đủ, lĩnh vực phụ trách, người review nội dung visa/sức khỏe/an toàn, quy trình sửa lỗi. |
| Authoritativeness | Tự giới thiệu license và press; review badges. | URL độc lập xác nhận doanh nghiệp/license, trang review đúng pháp nhân, nguồn giải thưởng, trích dẫn thực từ đối tác/báo. Audit này chưa xác thực những claim đó. |
| Trust | Có terms, privacy, địa chỉ và phương thức liên hệ. | Pháp nhân thống nhất, nguồn cho claim, ngày review thật, thông tin giá/phạm vi bao gồm minh bạch và xác nhận lead không bị thất lạc. |

Không được tự tạo author “Tuấn/Linh/Mai”, số tour đã dẫn, license, ảnh khảo sát hoặc review để lấp ô trống. Profile và bằng chứng doanh nghiệp cần được chủ doanh nghiệp xác nhận bằng hồ sơ thật.

## Những nội dung phải fact-check trước

1. **Luxury inspiration nhầm Amanoi với khu nghỉ ở Ninh Van Bay**, mô tả chỉ đến bằng speedboat. Trang chính thức Aman xác định Amanoi nhìn ra Vinh Hy Bay và đi ô tô khoảng 75 phút từ sân bay Cam Ranh. Đối chiếu cả những bài luxury/hotel khác có lặp claim này. Nguồn: [Amanoi chính thức](https://www.aman.com/resorts/amanoi).
2. **Visa guide gộp phí USD 25 cho cả single/multiple entry**. Cổng chính phủ nêu USD 25 single entry, USD 50 multiple entry. Bài first-time còn nói thường duyệt trong 24 giờ và chưa làm rõ trường hợp UK được miễn visa. Đổi thành hướng dẫn theo hộ chiếu/thời gian lưu trú, gắn nguồn và ngày review; không hứa thời gian xét duyệt. Nguồn: [Cổng e-visa Việt Nam](https://evisa.gov.vn/), [GOV.UK về nhập cảnh Việt Nam](https://www.gov.uk/foreign-travel-advice/vietnam/entry-requirements).
3. **Bài 2-week itinerary** viết chặng Da Nang → Hoi An qua Hai Van Pass, “Minh Mang's tomb at Tu Duc”, thời gian bay Hanoi → Da Nang 45 phút. Đây là dấu hiệu mâu thuẫn tuyến/địa danh cần người vận hành kiểm chứng; chưa xác nhận mọi giờ bay/di chuyển trong audit này. Cần bảng từng ngày, thời gian thực tế, sân bay và điểm đầu/cuối.
4. **Things-to-do và golf** có claim CNN, UNESCO, danh sách đề cử, trích lời nhân vật, thứ hạng sân golf mà không gắn tài liệu gốc trong body. Đánh dấu chờ xác minh, không kết luận các claim này đúng hoặc bịa khi chưa có chứng cứ.
5. **Our-story và review components** có “12,000 travellers”, Condé Nast 2015, “#1 Tour Operator”, “5.0 / 200+ reviews”; cần URL và thời điểm nguồn xác nhận. Thêm số liệu vào schema trước khi xác minh sẽ khuếch đại mâu thuẫn.

## GEO hướng tới lead: cấu trúc bài nên dùng

Mỗi bài nên giúp khách ra một quyết định rõ ràng. Bắt đầu bằng câu trả lời ngắn khoảng 50–90 từ khi phù hợp: dành cho ai, lựa chọn chính, điều kiện/giới hạn. Đây là đề xuất biên tập để câu trả lời dễ dùng, không phải công thức xếp hạng AI.

Tiếp theo là bảng quyết định có thông tin cụ thể: tuyến, số đêm, mùa phù hợp, thời gian di chuyển, giá hoặc cách tính giá, mức bao gồm và trường hợp không phù hợp. Gắn ngày/đơn vị/giả định cho số liệu. Phân biệt “đánh giá của đội ngũ” với dữ kiện có thể kiểm chứng bên ngoài.

Thêm bằng chứng nguyên gốc phù hợp: nhật ký khảo sát, ảnh thật có chú thích người/ngày/địa điểm, một case tour đã ẩn danh và cho phép công bố, hoặc so sánh dựa trên quy trình vận hành thực. Các đoạn này phải mang thông tin mới, không lặp slogan về local expertise.

CTA nối đúng nhu cầu: bài 14 ngày → “Get a private 14-day Vietnam plan”; bài gia đình → “Plan around your children's ages”; bài tháng 10 → “Check an October route with a flood-season alternative”. Form nhận sẵn trang/tour quan tâm và phần lịch trình khách muốn kiểm tra. Chỉ cam kết thời gian trả lời nếu đội sales thực hiện được.

### Các cụm nội dung nên ưu tiên

| Ưu tiên | Nhu cầu có khả năng tạo enquiry | Tận dụng nội dung hiện có | Phần bổ sung có giá trị |
|---|---|---|---|
| 1 | 14-day private Vietnam itinerary for UK travellers | Hai bài itinerary + classic tours + tour tương ứng | So sánh tuyến, số đêm, giá theo mùa/khách sạn, flights included/excluded, case thật. |
| 2 | Vietnam private tour cost for two people | Luxury guide + itinerary pages | Giá báo từ vận hành, tiền tệ/ngày hiệu lực, single supplement, khoản chưa gồm, cách đặt cọc. |
| 3 | Vietnam family private tour during UK school holidays | Family inspiration + month guides | Theo nhóm tuổi, chỗ ngồi trẻ em, cabin family, lịch di chuyển, mưa/nóng, case gia đình thật. |
| 4 | Halong Bay vs Lan Ha Bay / one vs two nights | Bay comparison + kayaking + tour/cruise hiện có | Bảng cảng/tàu/tuyến/mùa/giới hạn hoạt động, nguồn operator, chính sách hủy do thời tiết. |
| 5 | Vietnam in October / Christmas / Easter | Month guides | Lịch ngày lễ theo năm có nguồn, khí hậu ba vùng, tuyến thay thế và ngân sách theo kỳ nghỉ. |
| 6 | Vietnam local operator / private vs group / booking trust | Our-story, specialists, terms | Danh tính thật, license được xác thực, dịch vụ hỗ trợ, review nguồn độc lập, điều kiện thanh toán. |

Không tạo hàng chục trang chỉ đổi keyword. Culinary, golf, luxury và first-time đang có nhiều URL chồng intent; mỗi URL cần nhiệm vụ riêng hoặc được hợp nhất sau khi xem dữ liệu search/backlink.

## Đo lường AI → lead → doanh thu

- Giữ riêng **nguồn quan sát được** (referral hostname, campaign tag) và **khách tự khai**; chữ Markdown trong notes chỉ là hint về cách khách chuẩn bị lịch trình, không tính vào KPI AI acquisition.
- Khi thiếu referrer, lưu `unknown/direct`; không khẳng định khách tự gõ tên miền. Không thể nhận diện toàn bộ traffic AI. Traffic từ Google AI Overviews có thể không tách được khỏi Google organic từ referrer.
- Lưu landing page đầu phiên, last touch phù hợp, content/tour ID, CTA ID, UTM và lead ID sau khi backend nhận thành công. UTM/referrer có thể bị sửa hoặc mất; không gán độ tin cậy 100% như kết quả kiểm định.
- Events: `article_cta_click`, `form_start`, `lead_accepted`, `whatsapp_click`. WhatsApp click là micro-conversion, **không phải lead đã được nhận**.
- CRM bổ sung `qualified`, `quote_sent`, `booked`, `booking_value`, lý do mất. Đếm booking và lead duy nhất, không đếm lại do refresh/retry.
- KPI chính: qualified enquiries từ referral AI quan sát được; tỷ lệ enquiry/phiên AI; qualified/lead; quote/qualified; booked/quote; doanh thu. Theo dõi thêm khách tự khai dùng AI trong nhóm riêng.
- AI citation được đo bằng một bộ prompt cố định theo thị trường UK, ghi nền tảng/model/ngày/chế độ search/URL được trích. Báo cáo mẫu đã quan sát, không coi đó là thị phần AI toàn thị trường.

## Lộ trình triển khai

**Đợt 1 — Khôi phục nền tảng:** chốt production build và inventory 50 tour; canonical/redirect/sitemap; bảo toàn body blog; xác nhận backend thực nhận lead. Chạy lại audit sau deploy. Chưa nghiệm thu bằng cách chỉ xem code.

**Đợt 2 — Củng cố độ tin cậy:** chủ doanh nghiệp xác nhận entity, profile người thật, license/reviews/press; review visa và các lỗi địa danh; thay các ngày review tự động. Bổ sung các field nguồn, reviewer và field trip trong CMS rồi hiển thị nhất quán.

**Đợt 3 — Hoàn thiện 5–6 cụm có intent mua:** làm sâu bài 14 ngày, giá, family, bay comparison và mùa du lịch; nối CTA vào tour thật còn bán. Dùng case thật và phản hồi sales để viết nội dung có ích.

**Đợt 4 — Đo lường và cải tiến:** nối analytics/CRM, lập baseline bằng prompt và số enquiry thực tế; đánh giá sau khi có đủ dữ liệu. Không hứa thứ hạng, trích dẫn hay số lead chỉ từ việc bổ sung schema/FAQ.

## Tài liệu tham chiếu và dữ liệu bàn giao

- [Google: hướng dẫn tối ưu cho AI Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): SEO nền tảng vẫn quan trọng; không cần file AI đặc biệt hoặc schema đặc biệt. `llms.txt` không phải ưu tiên sửa ở dự án này.
- [Google: nội dung hữu ích và E‑E‑A‑T](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): đánh giá độ tin cậy, tác giả, trải nghiệm và giá trị gốc.
- [OpenAI: crawler](https://developers.openai.com/api/docs/bots): phân biệt OAI-SearchBot phục vụ tìm kiếm với GPTBot phục vụ huấn luyện. Robots live không chặn riêng AI bot, nhưng cần kiểm tra thêm CDN/firewall bằng log thật; HTTP GET audit chưa chứng minh AI bot truy cập được.
- `snapshot.json`: HTML đã trích text/metadata/schema, dữ liệu nội dung công khai, thời điểm kiểm tra và thống kê. Không chứa lead hay token.
- `article-inventory.csv`: 83 dòng dữ liệu để rà soát và giao việc.
- `ARTICLE_REVIEW.md`: hành động cụ thể cho 45 bài và tình trạng 14 bản blog.
- `URL_REVIEW.md`: toàn bộ 145 URL đã kiểm tra.
- `GEO_AI_MASTER.md`: prompt/runbook để lần kiểm tra sau tiếp tục theo cùng chuẩn.
- Chạy lại: `node scripts/audit-geo.mjs`. Script chỉ đọc public CMS và GET website, không publish hoặc gửi form. Sanity project cố định theo cấu hình public hiện tại; đối số URL chỉ thay website được crawl. Cần cập nhật project khi đổi CMS.
