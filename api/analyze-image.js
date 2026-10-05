export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST only'});
 try{
  const key=process.env.ANTHROPIC_API_KEY;if(!key)return res.status(500).json({error:'ANTHROPIC_API_KEY is not configured on the server.'});
  const body=req.body||{}; const mode=body.mode||'scan';
  let content,max_tokens=2400;
  if(mode==='compile'){
   if(!body.scanData)return res.status(400).json({error:'Missing scan data'});
   const shotRule=body.shotCount&&body.shotCount!=='auto'?('Generate EXACTLY '+body.shotCount+' shots, numbered SHOT 1 through SHOT '+body.shotCount+'. Do not generate more or fewer shots.'):('Choose the shot count yourself, normally 4-7 shots for a 30-second clip.');
   const prompt=shotRule+'\\n\\nCompile the supplied reference-image analysis and user action into a clean AI-video prompt. Use the scan facts as ground truth. Use the existing [SHOT PLAN] only as visual coverage possibilities, not as a fixed sequence. Create a FRESH directing interpretation every time this compile request runs. When shot count is AUTO, you may vary shot count; when an exact shot count is supplied above, obey it exactly. Deliberately vary framing, camera angles, camera movement, shot order, visual emphasis, pacing, environmental coverage, and ending composition while preserving the same scene facts and requested action. Avoid simply repeating the source shot plan verbatim. Do not include research uncertainty chatter in the finished prompt. Do not invent new major characters, props, locations, dialogue, audio, or story facts. Design for a 30-second clip. Use SHOT 1, SHOT 2, etc., NEVER timestamps. Do not assign exact seconds; let the shots breathe across the 30-second duration. Each shot must contain a [CAMERA / DIRECTING] line, then visible action. Add (PERFORMANCE / BODY DETAIL) only when useful and {ENVIRONMENT / VFX RESPONSE} only when useful. Every shot continues from the state created by the prior shot. For physical interaction preserve cause -> response -> consequence -> continuation; for quiet/solo scenes never inject combat behavior. The WAN seed is controlled outside this prompt and may remain fixed; do not include or change a seed. Randomize directing choices only, never the locked visual identity, environment, continuity anchors, or core user action. CRITICAL IDENTITY RULE: If scan data contains [VISUAL MEDIUM / STYLE LOCK], [PRIMARY SUBJECT IDENTITY LOCK], [STARTING STATE], and [BACKGROUND SUBJECT SEPARATION], reproduce all four sections faithfully in the finished prompt. Treat them as immutable facts. Never transfer clothing, helmets, masks, hair, facial features, weapons, accessories, or other identity traits from background people onto the primary subject. Negative persistent identity facts such as NO HELMET, exposed face, or no mask are equally binding. Do not treat temporary pose/state facts as permanent identity. Begin SHOT 1 from [STARTING STATE], then allow the user's requested action to change pose, position, gaze, contact, snow accumulation, and other temporary state naturally while identity remains locked. Randomization may change directing and staging, never the detected visual medium/style or identity. Return ONLY these sections: [SCENE FOUNDATION], [VISUAL MEDIUM / STYLE LOCK], [PRIMARY SUBJECT IDENTITY LOCK], [STARTING STATE], [BACKGROUND SUBJECT SEPARATION], [CONTINUITY ANCHORS], [SHOT SEQUENCE], [AUDIO], [ENDING], [CONSTRAINTS]. AUDIO must say no added audio unless explicitly requested by the user.\n\nSCAN DATA:\n'+body.scanData+'\n\nUSER ACTION:\n'+(body.action||'Subtle natural continuation from the reference image.');
   content=[{type:'text',text:prompt}];max_tokens=2200;
  }else{
   if(!body.image)return res.status(400).json({error:'Missing image'});
   const prompt=`Analyze this reference image for AI video generation. Be highly detailed but only describe visually supportable information. Do not invent story, identity, dialogue, audio, motives, or unseen facts.

Return plain text using EXACTLY these headings in this exact order:
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
[VISUAL MEDIUM / STYLE LOCK]
[PRIMARY SUBJECT IDENTITY LOCK]
[STARTING STATE]
[BACKGROUND SUBJECT SEPARATION]
[CONTINUITY ANCHORS]
[UNCERTAIN / DO NOT ASSUME]
[SHOT PLAN]

Under [VISUAL MEDIUM / STYLE LOCK], classify the visible medium/style from evidence only. It may be photorealistic live-action photography, realistic CGI/3D, stylized 3D animation, 2D anime, cartoon, comic/graphic illustration, painterly art, watercolor, stop-motion/clay, pixel art, or another supported medium. Preserve its anatomy/proportions, linework when present, shading, skin/surface treatment, material response, lighting, lens/depth behavior, texture, color treatment, and background rendering. State nearby media it must not drift into when visually clear. Never automatically prefer photorealism or convert one medium into another.

Under [PRIMARY SUBJECT IDENTITY LOCK], include only persistent visible identity traits that must survive every shot: face visibility, exact visible hair distribution and silhouette including full-haired versus shaved crown, headwear or its absence, facial hair, facial appearance, clothing/armor design, outer garments such as cloaks/mantles/capes, accessories, silhouette, and other distinctive features. Do not put pose, seated/standing state, gaze, hand position, snow placement, or temporary action state here. Explicitly state important visible absences such as NO HELMET or NO MASK.

Under [STARTING STATE], record only the reference image's temporary initial state: pose, seated/standing/kneeling state, body orientation, gaze, hand placement, visible object contact, current snow/dirt/wetness accumulation, and other conditions the later action may naturally change.

Under [BACKGROUND SUBJECT SEPARATION], distinguish background people from the primary subject and forbid transferring their helmets, clothing, weapons, facial coverage, or other traits onto the primary subject. If no background people are present, state that no separation is required.

Under [SHOT PLAN], provide 3-6 shot opportunities derived from the visible image. Use SHOT 1, SHOT 2, etc., never timestamps. SHOT 1 should preserve or closely match the reference composition. Other shots may suggest tighter, wider, profile, over-shoulder, detail, subject-environment coverage, or controlled camera movement only where visually supported. Do not invent story action. Every shot must include [CAMERA / DIRECTING] and explain what visible information it can emphasize. Mark nonessential shots OPTIONAL. This is a menu for the later action compiler, not a required sequence.`;
   content=[{type:'image',source:{type:'base64',media_type:body.mediaType||'image/jpeg',data:body.image}},{type:'text',text:prompt}];
  }
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:'claude-sonnet-4-5',max_tokens,messages:[{role:'user',content}]})});
  const data=await r.json();if(!r.ok)return res.status(r.status).json({error:data?.error?.message||'Anthropic request failed'});
  const text=(data.content||[]).filter(x=>x.type==='text').map(x=>x.text).join('\n');
  return res.status(200).json({text,mode});
 }catch(e){return res.status(500).json({error:e.message||String(e)})}
}