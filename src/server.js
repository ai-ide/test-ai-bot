import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// 初始化 OpenAI (如果有API密钥的话)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// 简单的预定义回复（用于演示）
const simpleResponses = [
  "你好！我是一个测试AI机器人。",
  "这是一个非常有趣的问题！",
  "我正在学习如何更好地与人类交流。",
  "让我想想...",
  "谢谢你的问题！",
  "我很高兴能和你聊天。",
  "这听起来很有意思！",
  "我还在不断学习中。"
];

// 聊天API端点
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversation = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    let response;

    if (openai) {
      // 使用OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "你是一个友好的AI助手，请用中文回复。" },
          ...conversation.map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      response = completion.choices[0].message.content;
    } else {
      // 使用简单的预定义回复
      const randomResponse = simpleResponses[Math.floor(Math.random() * simpleResponses.length)];
      response = `${randomResponse} (注意：这是演示模式，请设置OPENAI_API_KEY环境变量来使用实际的AI功能)`;
    }

    res.json({ 
      response,
      timestamp: new Date().toISOString(),
      usingOpenAI: !!openai
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: '抱歉，处理您的消息时出现了错误。',
      details: error.message 
    });
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AI Bot 服务器正在运行',
    hasOpenAI: !!openai,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🤖 AI Bot 服务器正在运行在端口 ${port}`);
  console.log(`🔧 OpenAI API: ${openai ? '已配置' : '未配置'}`);
  console.log(`🌐 访问: http://localhost:${port}`);
});