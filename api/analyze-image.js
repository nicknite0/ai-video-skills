export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'POST only'});
  try{
    const key=process.env.ANTHROPIC_API_KEY;
    if(!key) return res.status(500).json({error:'ANTHROPIC_API_KEY is not configured on the server.'});
    const {image,mediaType}=req.body||{};
    if(!image) return res.status(400).json({error:'Missing image'});
    const prompt=`Analyze this reference image for an AI video prompt. Be highly detailed but only describe visually supportable information. Do not invent story, identity, dialogue, audio, motives, or unseen facts.

Return plain text using EXACTLY these headings:
[VISIBLE SUMMARY]
[CHARACTER / SUBJECT]
[FACE / HAIR]
[CLOTHING / ACCESSORIES]
[POSE / PERFORMANCE]
[LOCATION / ENVIRONMENT]
[OBJECTS / PROPS]
[CAMERA / COMPOSITION]
[LIGHTING / COLOR]
[STYLE / MATERIALS]
[SPATIAL RELATIONSHIPS]
[CONTINUITY ANCHORS]
[UNCERTAIN / DO NOT ASSUME]

Under each heading give concise but detailed prompt-ready observations. If a detail is uncertain, say uncertain rather than guessing.`;
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{
      'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'
    },body:JSON.stringify({model:'claude-sonnet-4-5',max_tokens:1800,messages:[{role:'user',content:[
      {type:'image',source:{type:'base64',media_type:mediaType||'image/jpeg',data:image}},
      {type:'text',text:prompt}
    ]}]})});
    const data=await r.json();
    if(!r.ok) return res.status(r.status).json({error:data?.error?.message||'Anthropic request failed'});
    const text=(data.content||[]).filter(x=>x.type==='text').map(x=>x.text).join('\n');
    return res.status(200).json({text});
  }catch(e){return res.status(500).json({error:e.message||String(e)})}
}