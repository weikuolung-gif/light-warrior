(()=>{'use strict';
const base=()=>window.LW_CONFIG.supabaseUrl.replace(/\/$/,'')+'/functions/v1/';
async function request(name,method='GET',body){const r=await fetch(base()+name,{method,headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});let data=await r.json().catch(()=>({}));if(!r.ok||data.success===false)throw Error(data.error||'HTTP '+r.status);return data}
async function top(limit=10){const result=await request('get-leaderboard');return (result.leaderboard||[]).slice(0,limit).map(x=>({...x,player_name:x.name}))}
async function submit(name,score,duration){return request('submit-score','POST',{name,score,duration})}
window.LWCloud={top,submit,eventId:()=> '全場'};
})();