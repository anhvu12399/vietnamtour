# GEO Plan — vietnamtours.co.uk → ChatGPT (UK market)

Stack: Next.js 16 (App Router, ISR `revalidate = 60`) + Sanity + Vercel.
Mục tiêu: được **ChatGPT (Search + browsing) trích dẫn / gợi ý** khi người dùng UK hỏi về
"private / luxury / tailor-made Vietnam tours", rồi chuyển thành enquiry.

## 0. Cách ChatGPT chọn nguồn (cơ sở của plan)

1. **ChatGPT Search = index riêng của OpenAI (OAI-SearchBot) + hạ tầng Bing.** Các phân tích bên thứ ba
   cho thấy phần lớn citation trùng top organic của Bing → **Bing ranking là điều kiện cần**
   (đây là số liệu từ blog SEO, không phải OpenAI công bố — dùng làm định hướng, không phải tuyệt đối).
2. Bot cần cho phép: `OAI-SearchBot` (hiện trong ChatGPT search), `ChatGPT-User` (khi user bấm/yêu cầu duyệt),
   `GPTBot` (chỉ để train — **không ảnh hưởng việc xuất hiện trong search**; quyết định riêng).
   Xác minh lại tại developers.openai.com/api/docs/bots trước khi sửa robots.txt.
3. Model trích dẫn trang **rõ ràng, có thể "bóc" thành câu trả lời**: đoạn trả lời trực tiếp, số liệu cụ thể,
   FAQ, so sánh, nguồn có uy tín, nội dung mới, thông tin thương hiệu nhất quán trên nhiều nơi
   (Trustpilot, TripAdvisor, ABTA/ATOL, Wikipedia/Wikidata, Reddit, báo chí travel UK).
4. Nội dung nằm trong HTML render phía server (Next.js đã SSR/ISR → tốt; crawler AI thường **không chạy JS**).

## 1. Hiện trạng codebase (audit nhanh)

| Hạng mục | Hiện trạng | Vấn đề |
|---|---|---|
| `public/robots.txt` | `Allow: /`, chặn `/studio/` | Không nêu rõ AI bots; 2 khối `User-agent: *` tách rời; chưa chặn `/api/` |
| `src/app/sitemap.ts` | Đầy đủ route | `lastModified: new Date()` cho gần như mọi URL → tín hiệu freshness **giả**, Bing/OAI có thể bỏ qua. Cần dùng `_updatedAt` từ Sanity |
| JSON-LD site-wide | `layout.tsx` (Organization/TravelAgency) | `sameAs` rỗng; địa chỉ chỉ có `London`; phone +84 (không phải số UK) → yếu về tín hiệu "UK business" |
| `SeoJsonLd.tsx` | Có Organization, Breadcrumb, Article, FAQ, TouristTrip, TouristDestination | `TouristTripJsonLd` & `TouristDestinationJsonLd` **chưa được dùng** ở `/itineraries/[slug]`, `/destinations/[slug]`; `FaqJsonLd` chỉ ở các trang data tĩnh (things-to-do, trip-ideas, inspirations, ideas-by-month) |
| Author | `ArticleJsonLd` author = Organization "Vietnam Tour" | Không có Person/expert → thiếu E-E-A-T (schema `specialist` đã có trong Sanity nhưng chưa nối) |
| Sanity schema | `seoFields` có metaTitle/Description/noIndex | Không có field cho: FAQ (itinerary/destination), `answerSummary`, `lastReviewed`, `author`, `sources` |
| `llms.txt` | Chưa có | — |
| Đo lường | `src/lib/trafficDetector.ts` + `src/app/api/route.ts` đã nhận diện referrer ChatGPT/Gemini/Perplexity/Claude/Copilot và lưu vào enquiry | Đây là nền tốt để đo — cần mở rộng (xem Phase 5) |
| Bing | Có file verify Google (`googlea14662f463f82247.html`) | Cần **verify** đã có Bing Webmaster Tools chưa (chưa thấy trong repo) |

## 2. Roadmap

### Phase 1 — Technical access (tuần 1)  ·  chi phí thấp, tác động cao

- [ ] **Bing Webmaster Tools**: verify domain, submit sitemap, import từ GSC. *Đây là việc quan trọng nhất cho ChatGPT.*
- [ ] **IndexNow**: thêm key file vào `public/` + gọi API khi Sanity publish (webhook → route handler `/api/indexnow`). Bing nhận URL mới/đổi trong vài giờ.
- [ ] **Chuyển robots.txt sang `src/app/robots.ts`**:
  - `OAI-SearchBot`, `ChatGPT-User`: `Allow: /` (bắt buộc)
  - `GPTBot`: quyết định (khuyến nghị Allow để model hiểu thương hiệu; chặn cũng không mất search)
  - Cũng allow: `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `Applebot-Extended`
  - Chặn `/studio/`, `/api/`, `/enquire/thank-you` nếu có
- [ ] **Kiểm tra Vercel Firewall / Bot Protection**: nhiều dự án Vercel vô tình challenge bot AI. Test bằng `curl -A "OAI-SearchBot" https://www.vietnamtours.co.uk/` → phải 200 + HTML đầy đủ.
- [ ] **Sitemap**: dùng `_updatedAt` của Sanity cho `lastModified`; bỏ `changeFrequency/priority` (bị bỏ qua). Với trang data tĩnh dùng ngày commit/`dateModified` thật.
- [ ] **Core Web Vitals / TTFB**: kiểm tra `revalidate=60` + ảnh `cdn.sanity.io`; crawler AI timeout ngắn.
- [ ] Đảm bảo mọi trang có **canonical tuyệt đối**, `hreflang="en-GB"` (hoặc chỉ `lang="en-GB"` nếu 1 ngôn ngữ — đã có), không noindex nhầm.

### Phase 2 — Structured data & entity (tuần 1–3)

Sửa `src/components/SeoJsonLd.tsx` + gắn vào page:

- [ ] **Organization / TravelAgency** (layout): thêm `@id` (`https://www.vietnamtours.co.uk/#org`), `sameAs` đầy đủ (Facebook, Instagram, TripAdvisor, Trustpilot, LinkedIn, YouTube, Wikidata nếu có), `foundingDate`, `founder`, `address` UK đầy đủ **nếu có địa chỉ/đăng ký UK thật**, `telephone` UK (+44) nếu có, `hasCredential`/`memberOf` (ABTA, ATOL, ATAS… **chỉ khi thực sự có**), `aggregateRating` **chỉ khi khớp review thật có thể kiểm chứng**.
- [ ] **TouristTrip + Offer** cho `/itineraries/[slug]` và `destinations/[slug]/tours/[tourSlug]`: duration (ISO 8601 `P10D`), `priceCurrency: GBP`, `price` "from", `itinerary` (ItemList theo ngày), `provider` → `@id` org.
- [ ] **TouristDestination** cho `/destinations/[slug]`.
- [ ] **FAQPage** cho itinerary / destination / travel-guide (hiện chỉ có ở trang data tĩnh). Lưu ý: Google đã hạn chế rich result FAQ, nhưng **LLM vẫn đọc FAQ tốt** — nội dung FAQ phải hiện thấy trên trang.
- [ ] **Person** (specialist) cho author: nối `ArticleJsonLd.author` → specialist trong Sanity (`name`, `jobTitle`, `url`, `sameAs`, `knowsAbout`).
- [ ] **BreadcrumbList** cho mọi trang dynamic (hiện chỉ ở một số).
- [ ] Validate bằng Schema Markup Validator; thêm test nhỏ (script) kiểm JSON-LD parse được ở build.

### Phase 3 — Nội dung "answer-first" cho truy vấn UK (tuần 2–8, liên tục)

**Nguyên tắc mỗi trang:** (1) đoạn trả lời 40–60 từ ngay dưới H1; (2) số liệu cụ thể (giá £, số đêm, giờ bay LHR→HAN, nhiệt độ theo tháng); (3) H2 dạng câu hỏi; (4) bảng so sánh; (5) FAQ 5–8 câu; (6) "Last reviewed: <ngày>" + tên chuyên gia; (7) link ra nguồn chính thức.

**Bộ prompt mục tiêu (UK) — dùng làm checklist nội dung và tracking:**

- "best luxury private tour operator for Vietnam from the UK"
- "tailor-made Vietnam holiday 2 weeks cost per person UK"
- "how much does a private tour of Vietnam cost from London"
- "best time to visit Vietnam for UK travellers by month"
- "Vietnam visa for UK citizens 2026" *(xác minh nguồn chính thức; ghi ngày cập nhật)*
- "Ha Long Bay luxury cruise vs Lan Ha Bay"
- "is Vietnam safe for solo female travellers / families from UK"
- "Vietnam itinerary 10 days / 14 days / 3 weeks"
- "direct flights London to Hanoi / Ho Chi Minh City, jet lag, flight time"
- "Vietnam and Cambodia / Laos combined tour from UK"
- "ABTA / ATOL protected Vietnam holiday"
- "Vietnam honeymoon / family / multi-generational tour UK"

**Cấu trúc nội dung cần thêm (map vào route hiện có):**

- [ ] Hub "**Vietnam tours from the UK**" (planning guide: flights từ LHR/MAN, chênh múi giờ, tiền GBP↔VND, tiêm chủng theo NHS/TravelHealthPro, bảo hiểm, ATOL/ABTA) — thêm route mới, ví dụ `/vietnam-holidays-from-uk`.
- [ ] **Pricing transparency**: bảng "How much does a Vietnam tour cost?" (theo số ngày × mức luxury, đơn vị £). LLM ưu tiên nguồn có số cụ thể.
- [ ] **Comparison pages**: "Private vs group tour Vietnam", "North vs South Vietnam", "Ha Long vs Lan Ha", "Vietnam vs Thailand for UK first-timers".
- [ ] **Month pages** (`/ideas-by-month/[month]`) → bổ sung bảng thời tiết/giá/đám đông + FAQ; đã có nền.
- [ ] **Visa guide** (`/visa-guide`) → ghi rõ ngày cập nhật + link cổng chính thức; trang này dễ được trích nhất, nhưng sai thông tin = rủi ro uy tín.
- [ ] **Nội dung "original data"**: ảnh thật, review khách UK (tên viết tắt + tháng đi), chi phí thực tế, dữ liệu tự thu thập (vd. "chúng tôi đưa X khách UK / năm") — thứ LLM không tìm được ở nơi khác.
- [ ] **Sanity**: thêm vào schema `itinerary`, `destination`, `post`, `travelGuide`: `answerSummary` (text ≤300 ký tự), `faqs[]`, `author → specialist`, `lastReviewedAt`, `sources[]`; hiển thị `dateModified` thật ra JSON-LD.
- [ ] **Style**: HTML ngữ nghĩa (`<h2>`, `<table>`, `<ul>`), tránh nội dung chỉ nằm trong accordion render client-only (kiểm tra `FaqAccordion`, `TimelineInteractive` — nội dung phải có trong HTML ban đầu, không chỉ sau khi hydrate).
- [ ] Giọng văn **en-GB** (holiday, programme, colour, "tailor-made"), giá £, ngày dd/mm/yyyy.

### Phase 4 — `llms.txt` & feed (tuần 2)

- [ ] `public/llms.txt` (hoặc route `app/llms.txt/route.ts` sinh từ Sanity): mô tả công ty 3 dòng, danh sách trang quan trọng + 1 dòng mô tả. Chi phí thấp; **chưa có bằng chứng chắc chắn ChatGPT đọc** → đặt ưu tiên thấp, không kỳ vọng.
- [ ] (Tuỳ chọn) bản Markdown của trang chính: `/itineraries/x.md` qua route handler — hữu ích cho agent/browse.
- [ ] RSS cho `/blog` & `/travel-guides` (thêm kênh khám phá + freshness).

### Phase 5 — Uy tín ngoài site (tuần 2 → liên tục; thường quyết định phần lớn kết quả)

LLM trích dẫn thương hiệu được nhắc ở **nhiều nguồn độc lập**. Ưu tiên:

- [ ] **TripAdvisor, Trustpilot, Google Business Profile** (UK): xin review từ khách UK; thông tin NAP nhất quán 100% với JSON-LD.
- [ ] **Danh bạ/chứng nhận UK**: ABTA, ATOL (nếu đủ điều kiện), Responsible Travel, Which? Trusted Traders, Feefo — chỉ khai khi có thật.
- [ ] **Digital PR UK**: pitch The Guardian/Telegraph/Independent Travel, Wanderlust, Condé Nast Traveller UK, Lonely Planet UK, Time Out; chuyên gia bình luận (HARO-style: Qwoted, Featured, Muck Rack, Response Source UK).
- [ ] **Reddit** (r/VietnamTravel, r/travel, r/solotravel, r/uktravel): tham gia thật, minh bạch quan hệ; đừng spam — LLM và Reddit đều phạt.
- [ ] **Wikidata / Wikipedia** (nếu đủ notability), Crunchbase, LinkedIn Company, YouTube (video chuyên gia — ChatGPT hay trích transcript YouTube).
- [ ] Listing trong "best Vietnam tour operators" của site thứ ba (đây chính là loại bài ChatGPT hay trích để gợi ý vendor): liên hệ biên tập, hoặc tự xuất bản dữ liệu so sánh khách quan.

### Phase 6 — Đo lường & vòng lặp (từ tuần 2)

1. **Referral**: ChatGPT gắn `utm_source=chatgpt.com` vào link. `trafficDetector.ts` đã bắt `chatgpt.com`/`openai.com` — mở rộng:
   - log **mọi visit** có `utm_source=chatgpt.com` (không chỉ khi gửi enquiry) vào Vercel Analytics custom event hoặc Sanity doc `aiVisit`;
   - thêm UA/ref cho `copilot.microsoft.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com` (đã có phần lớn);
   - báo cáo hàng tuần: AI visits, landing page, enquiry từ AI.
2. **Server log AI crawler**: Vercel Log Drain / middleware đếm hit của `OAI-SearchBot`, `ChatGPT-User`, `GPTBot` theo URL → biết trang nào được index/đọc. *Lưu ý*: middleware cần nhẹ, không chặn request.
3. **Prompt tracking thủ công** (bảng 30–50 prompt UK ở Phase 3, chạy hàng tuần ở ChatGPT bản UK, logged-out + logged-in): ghi *có nhắc brand? có link? vị trí? đối thủ nào?* Lưu Google Sheet. Có thể dùng tool: Profound, Otterly.ai, Peec AI, Semrush AI Toolkit, Ahrefs Brand Radar (cân nhắc chi phí).
4. **GSC + Bing WMT**: theo dõi impressions truy vấn dạng câu hỏi dài (dấu hiệu của traffic kiểu AI).
5. Mỗi 4 tuần: xem trang nào được trích → nhân bản cấu trúc; trang không được trích → viết lại answer-first, thêm dữ liệu/nguồn.

## 3. KPI

| KPI | Mốc 30 ngày | Mốc 90 ngày |
|---|---|---|
| Site được index trong Bing, có OAI-SearchBot hits | ✔ | ✔ |
| JSON-LD đúng cho 100% trang itinerary/destination | ✔ | ✔ |
| Prompt UK (bộ 30–50) có nhắc brand | baseline | ≥ 15–25% |
| Prompt "how-to/info" có link tới site | baseline | ≥ 20% |
| Visit từ `chatgpt.com` / tháng | baseline | tăng liên tục, có enquiry |
| Review UK mới (TripAdvisor/Trustpilot) | +10 | +30 |
| Backlink/mention từ UK media | 1–2 | 5+ |

*Số mục tiêu là giả định để đặt baseline — chỉnh sau khi có dữ liệu tuần 2.*

## 4. Rủi ro & lưu ý

- **Không có cam kết xếp hạng trong ChatGPT**; câu trả lời thay đổi theo ngày/người dùng/vị trí. Đánh giá theo xu hướng, không theo 1 lần chạy.
- **Không bịa**: chứng nhận (ABTA/ATOL), rating, địa chỉ UK, "award" chỉ khai khi có thật — sai lệch giữa schema và thực tế là rủi ro pháp lý (CMA/ASA ở UK) và bị LLM đối chiếu.
- Thông tin visa/y tế/an ninh phải có nguồn chính thức (Vietnam e-visa portal, FCDO, TravelHealthPro) và ngày kiểm tra.
- Không nhồi keyword; viết cho người đọc trước.
- `GPTBot` allow/block là quyết định kinh doanh (bản quyền nội dung) — tách khỏi việc xuất hiện trong ChatGPT Search.
- Các số liệu về Bing/ChatGPT lấy từ blog bên thứ ba; kiểm chứng lại với tài liệu OpenAI/Bing chính thức trước khi đầu tư lớn.

## 5. Thứ tự thực hiện đề xuất (sprint)

| Sprint | Việc |
|---|---|
| **S1 (3–4 ngày)** | Bing WMT + IndexNow, `robots.ts`, test bot không bị Vercel chặn, sitemap `_updatedAt`, `llms.txt` |
| **S2 (1 tuần)** | JSON-LD: Organization (`@id`, `sameAs`), TouristTrip+Offer, TouristDestination, FAQ, Person; field Sanity mới |
| **S3 (2 tuần)** | Hub "Vietnam holidays from the UK", pricing table, 4 trang so sánh, nâng cấp visa-guide + month pages |
| **S4 (liên tục)** | Review/PR/Reddit/YouTube, tracking prompt hàng tuần, mở rộng `trafficDetector` + log AI crawler |
