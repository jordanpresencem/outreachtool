import { scrapeFromHtml } from '../scrapers/onlyfinder';

const SAMPLE_HTML = `
<div class="row my-5 mx-2 user-profile click-collector " id="profile-nectar" data-pos="0" data-username="nectar" data-rid="19197213" data-clickurl="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PW5lY3RhciZwb3M9MCZpYXQ9MTc2MzU5MzUwMjA4OSZjYXQ9NTU4JmRzPVNFQVJDSCZleHA9ZWxhc3RpY3NlYXJjaCZzaWQ9RVdJOGV1VmNLOWxpYktvU25HRnJSYzl6UnFqQnpIOVYmdmFyPWNvbnRyb2w.f33e5090931dbc1c4a0d6b6b51d0845e8f2f9c054028d18fb009ee07edb9260a" data-tid="aed88883-555e-4373-8528-ac212a205dc1" data-b="0.00" data-source="" data-category-ids="558" data-generated="false">
  <div class="col-sm-auto col-12 avatar-container">
    <a href="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PW5lY3RhciZwb3M9MCZpYXQ9MTc2MzU5MzUwMjA4OSZjYXQ9NTU4JmRzPVNFQVJDSCZleHA9ZWxhc3RpY3NlYXJjaCZzaWQ9RVdJOGV1VmNLOWxpYktvU25HRnJSYzl6UnFqQnpIOVYmdmFyPWNvbnRyb2w.f33e5090931dbc1c4a0d6b6b51d0845e8f2f9c054028d18fb009ee07edb9260a" target="_blank" rel="noopener nofollow" referrerpolicy="origin" aria-label="todo" class="d-block">
      <img src="https://media.onlyfinder.com/8c/8c621269-9c0f-4db3-a97a-7f0facf25dc8/nectar-onlyfans.webp" alt="Nectar nectar OnlyFans" title="Nectar nectar OnlyFans" class="img-responsive" loading="eager" onerror="noPhoto(this)">
    </a>
  </div>
  <div class="col-sm-7 col-md-8 col-12">
    <div class="row my-sm-0 my-2">
      <div class="col-auto">
        <a href="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PW5lY3RhciZwb3M9MCZpYXQ9MTc2MzU5MzUwMjA5MCZjYXQ9NTU4JmRzPVNFQVJDSCZleHA9ZWxhc3RpY3NlYXJjaCZzaWQ9RVdJOGV1VmNLOWxpYktvU25HRnJSYzl6UnFqQnpIOVYmdmFyPWNvbnRyb2w.d9887b838d19261e5c537fb235439c6de64132546d2f97e2d11d2cad01adfa5f" target="_blank" rel="noopener nofollow" referrerpolicy="origin">
          <!-- onlyfans.com > nectar<br> -->
          <h3 class="fs-6 m-0">Nectar</h3>
        </a>
      </div>
      <div class="col-10 col-sm-auto text-muted">
        <a href="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PW5lY3RhciZwb3M9MCZpYXQ9MTc2MzU5MzUwMjA5MCZjYXQ9NTU4JmRzPVNFQVJDSCZleHA9ZWxhc3RpY3NlYXJjaCZzaWQ9RVdJOGV1VmNLOWxpYktvU25HRnJSYzl6UnFqQnpIOVYmdmFyPWNvbnRyb2w.d9887b838d19261e5c537fb235439c6de64132546d2f97e2d11d2cad01adfa5f" target="_blank" rel="noopener nofollow" referrerpolicy="origin" aria-label="todo" class="text-muted text-decoration-none">
          <span class="me-2 d-none d-sm-inline"> | </span>onlyfans.com > nectar
        </a>
      </div>
      <div class="col-auto"></div>
    </div>
    <div class="row my-2 my-sm-2">
      <div class="col-auto">
        <img src="/static/heart.svg" alt="Favorite count icon" class="profile-icon"/> 100,023
      </div>
      <div class="col-auto">
        <img src="/static/photo-count.svg" alt="Photo count icon" class="profile-icon"/> 347
      </div>
      <div class="col-auto">
        <img src="/static/video-count.svg" alt="Video count icon" class="profile-icon"/> 450
      </div>
      <div class="col-auto">
        <img src="/static/price-tag.svg" alt="Price tag icon" class="profile-icon"/>
        <span>
          <strong>$3.99</strong>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pb-2 text-muted about-profile">
        <p class="mb-1 mb-sm-0 profile-about"> Cum taste the queens ambrosia 🐝 🍯 The sweetest squirt 👅 you have ever tasted...No PPV ever.. Join my Hive and watch your dreams come true 💦 </p>
      </div>
    </div>
    <div class="row mb-3 mb-sm-0"></div>
  </div>
</div>
<div class="row my-5 mx-2 user-profile profile-container " id="profile-kiera.brooks" data-pos="1" data-username="kiera.brooks" data-rid="345463198" data-clickurl="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PWtpZXJhLmJyb29rcyZwb3M9MSZpYXQ9MTc2MzU5MzUwMjA5MCZjYXQ9NTU4JmRzPVNFQVJDSCZybT0xJmV4cD1lbGFzdGljc2VhcmNoJnNpZD1FV0k4ZXVWY0s5bGliS29TbkdGclJjOXpScWpCekg5ViZ2YXI9Y29udHJvbA.2565869ab1b574a536b0eb9e7c0274006e182c056060184ef4b443f9b222d35b" data-tid="ffb0746e-7b7d-4b86-af98-c662ab4bd6c3" data-b="121.72" data-source="" data-category-ids="558" data-generated="false">
  <div class="col-sm-auto col-12 avatar-container">
    <a href="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PWtpZXJhLmJyb29rcyZwb3M9MSZpYXQ9MTc2MzU5MzUwMjA5MCZjYXQ9NTU4JmRzPVNFQVJDSCZybT0xJmV4cD1lbGFzdGljc2VhcmNoJnNpZD1FV0k4ZXVWY0s5bGliS29TbkdGclJjOXpScWpCekg5ViZ2YXI9Y29udHJvbA.2565869ab1b574a536b0eb9e7c0274006e182c056060184ef4b443f9b222d35b" target="_blank" rel="noopener nofollow" referrerpolicy="origin" aria-label="todo" class="d-block">
      <img src="https://media.onlyfinder.com/3c/3cabd599-f3bd-4a37-958f-b79a9d35d837/kiera.brooks-onlyfans.webp" alt="Kiera 🧃🧸 kiera.brooks OnlyFans" title="Kiera 🧃🧸 kiera.brooks OnlyFans" class="img-responsive" loading="eager" onerror="noPhoto(this)">
    </a>
  </div>
  <div class="col-sm-7 col-md-8 col-12">
    <div class="row my-sm-0 my-2">
      <div class="col-auto">
        <a href="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PWtpZXJhLmJyb29rcyZwb3M9MSZpYXQ9MTc2MzU5MzUwMjA5MCZjYXQ9NTU4JmRzPVNFQVJDSCZybT0xJmV4cD1lbGFzdGljc2VhcmNoJnNpZD1FV0k4ZXVWY0s5bGliS29TbkdGclJjOXpScWpCekg5ViZ2YXI9Y29udHJvbA.2565869ab1b574a536b0eb9e7c0274006e182c056060184ef4b443f9b222d35b" target="_blank" rel="noopener nofollow" referrerpolicy="origin">
          <!-- onlyfans.com > kiera.brooks<br> -->
          <h3 class="fs-6 m-0">Kiera 🧃🧸 </h3>
        </a>
      </div>
      <div class="col-10 col-sm-auto text-muted">
        <a href="https://onlyfinder.co/visit-profile/?e=cmVmPWh0dHBzJTNBJTJGJTJGb25seWZpbmRlci5jbyUyRm5ldyZ1PWtpZXJhLmJyb29rcyZwb3M9MSZpYXQ9MTc2MzU5MzUwMjA5MCZjYXQ9NTU4JmRzPVNFQVJDSCZybT0xJmV4cD1lbGFzdGljc2VhcmNoJnNpZD1FV0k4ZXVWY0s5bGliS29TbkdGclJjOXpScWpCekg5ViZ2YXI9Y29udHJvbA.2565869ab1b574a536b0eb9e7c0274006e182c056060184ef4b443f9b222d35b" target="_blank" rel="noopener nofollow" referrerpolicy="origin" aria-label="todo" class="text-muted text-decoration-none">
          <span class="me-2 d-none d-sm-inline"> | </span>onlyfans.com > kiera.brooks
        </a>
      </div>
      <div class="col-auto">
        <span><img src="/static/rectangle-ad-light.webp" alt="Ad icon" width="22px" height="20px"/></span>
      </div>
    </div>
    <div class="row my-2 my-sm-2">
      <div class="col-auto">
        <strong>
          <img src="/static/up-chart.svg" alt="New profile icon" class="profile-icon"/> NEW
        </strong>
      </div>
      <div class="col-auto">
        <img src="/static/photo-count.svg" alt="Photo count icon" class="profile-icon"/> 23
      </div>
      <div class="col-auto">
        <img src="/static/video-count.svg" alt="Video count icon" class="profile-icon"/> 12
      </div>
      <div class="col-auto">
        <img src="/static/price-tag.svg" alt="Price tag icon" class="profile-icon"/>
        <span>
          <strong>FREE</strong>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pb-2 text-muted about-profile">
        <p class="mb-1 mb-sm-0 profile-about"> I'm just an all-round VERY naughty lil 18 year old 😜 I'm studying film at college so... i guess doing OF is 'practice' right? hehe 🤭 Come tell me if i'm any good... I'll be waitingg 😝💖 </p>
      </div>
    </div>
    <div class="row mb-3 mb-sm-0">
      <div class="col-auto">
        <a target="_blank" rel="noopener nofollow" data-type="instagram" href="https://instagram.com/kiera.brookss">
          <img src="/static/instagram.svg" alt="Instagram link" width="17px" height="20px"/>
        </a>
      </div>
      <div class="col-auto">
        <a target="_blank" rel="noopener nofollow" data-type="twitter" href="https://twitter.com/kieraabrookee">
          <img src="/static/twitter.svg" alt="Twitter link" width="18px" height="18px"/>
        </a>
      </div>
      <div class="col-auto">
        <a target="_blank" rel="noopener nofollow" data-type="tiktok" data-pos="50" data-s="1" href="https://tiktok.com/@kiera.brooksx">
          <img src="/static/tiktok.svg" alt="Tiktok link" width="16px" height="18px"/>
        </a>
      </div>
    </div>
  </div>
</div>
`;

const results = scrapeFromHtml(SAMPLE_HTML);
console.log(JSON.stringify(results, null, 2));
