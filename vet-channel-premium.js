// VetWel Turkey clinic-finder visual alignment.
// Presentation only: purchasing-channel logic and clinic-finder behavior are unchanged.
(() => {
  const apply = () => {
    if (document.documentElement.lang === 'en' || !document.querySelector('#nereden-alinir')) return;
    if (document.querySelector('#vetwel-channel-premium-style')) return;

    const style = document.createElement('style');
    style.id = 'vetwel-channel-premium-style';
    style.textContent = `
      #nereden-alinir.vet-channel-section{
        background:linear-gradient(180deg,#f7f9fc 0%,#f1f6f9 100%)!important;
        color:#24384d!important;
        border-top:1px solid #e6edf3!important;
        border-bottom:1px solid #e6edf3!important;
      }
      #nereden-alinir.vet-channel-section:before{
        width:440px!important;height:440px!important;right:-175px!important;top:-185px!important;
        background:rgba(76,145,169,.07)!important;
      }
      #nereden-alinir .vet-channel-grid{gap:58px!important;}
      #nereden-alinir .vet-channel-badge{
        background:#e9f4f5!important;
        border:1px solid #d2e7e9!important;
        color:#317083!important;
        box-shadow:none!important;
      }
      #nereden-alinir .vet-channel-copy h2{
        color:#0b2447!important;
        font-size:clamp(32px,4.15vw,50px)!important;
        line-height:1.08!important;
        letter-spacing:-1.6px!important;
      }
      #nereden-alinir .vet-channel-copy>p{
        color:#607184!important;
        font-size:16px!important;
        line-height:1.75!important;
      }
      #nereden-alinir .vet-channel-copy>p strong{color:#304b65!important;}
      #nereden-alinir .vet-channel-steps{gap:13px!important;margin-top:28px!important;}
      #nereden-alinir .vet-channel-step{
        min-height:104px!important;
        padding:18px 17px!important;
        background:#fff!important;
        border:1px solid #dfe8ef!important;
        border-radius:16px!important;
        box-shadow:0 7px 22px rgba(17,50,78,.045)!important;
      }
      #nereden-alinir .vet-channel-step strong{
        display:inline-grid!important;
        place-items:center!important;
        width:29px!important;height:29px!important;
        margin-bottom:11px!important;
        border-radius:9px!important;
        background:#eaf3f7!important;
        color:#315f7d!important;
        font-size:10px!important;
        letter-spacing:.5px!important;
      }
      #nereden-alinir .vet-channel-step span{
        color:#344c62!important;
        font-size:13px!important;
        font-weight:750!important;
        line-height:1.45!important;
      }
      #nereden-alinir .vet-clinic-card{
        background:#fff!important;
        color:#172333!important;
        border:1px solid #dce6ee!important;
        border-radius:20px!important;
        padding:31px!important;
        box-shadow:0 12px 36px rgba(17,50,78,.08)!important;
      }
      #nereden-alinir .vet-clinic-card .clinic-icon{
        width:50px!important;height:50px!important;
        border-radius:14px!important;
        background:#edf5f7!important;
        border:1px solid #dcebed!important;
        color:#2b6881!important;
      }
      #nereden-alinir .vet-clinic-card h3{color:#0b2447!important;font-size:25px!important;}
      #nereden-alinir .vet-clinic-card>p{color:#69798a!important;}
      #nereden-alinir .vet-clinic-features{color:#53697d!important;}
      #nereden-alinir .vet-clinic-features li:before{
        background:#edf7f1!important;
        color:#397356!important;
      }
      #nereden-alinir .vet-clinic-card .button-primary{
        background:#0b2447!important;
        border-color:#0b2447!important;
        color:#fff!important;
        box-shadow:0 8px 20px rgba(11,36,71,.12)!important;
      }
      #nereden-alinir .vet-clinic-card .button-primary:hover{
        background:#173f6b!important;
        border-color:#173f6b!important;
      }
      #nereden-alinir .vet-channel-actions .button-light{
        background:#0b2447!important;
        border-color:#0b2447!important;
        color:#fff!important;
      }
      #nereden-alinir .vet-channel-actions .button-secondary{
        background:#fff!important;
        border-color:#ccd9e3!important;
        color:#0b2447!important;
      }
      #nereden-alinir .vet-channel-actions .button-secondary:hover{
        background:#eef4f8!important;
        border-color:#c1d2df!important;
      }
      @media(max-width:900px){
        #nereden-alinir .vet-channel-grid{gap:35px!important;}
      }
      @media(max-width:640px){
        #nereden-alinir .vet-channel-copy h2{font-size:34px!important;letter-spacing:-1px!important;}
        #nereden-alinir .vet-channel-step{min-height:auto!important;}
        #nereden-alinir .vet-clinic-card{padding:24px!important;}
      }
    `;
    document.head.appendChild(style);
  };

  if (document.readyState === 'complete') apply();
  else window.addEventListener('load', apply, { once:true });
})();
