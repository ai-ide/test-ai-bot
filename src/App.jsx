import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState(null)
  const messagesEndRef = useRef(null)

  // 检查服务器状态
  useEffect(() => {
    checkServerHealth()
  }, [])

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const checkServerHealth = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setServerStatus(data)
    } catch (error) {
      console.error('无法连接到服务器:', error)
      setServerStatus({ status: 'error', message: '服务器连接失败' })
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)

    // 添加用户消息
    const newUserMessage = {
      id: Date.now(),
      content: userMessage,
      role: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])

    try {
      // 发送到API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // 添加AI回复
      const aiMessage = {
        id: Date.now() + 1,
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        usingOpenAI: data.usingOpenAI
      }
      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('发送消息失败:', error)
      // 添加错误消息
      const errorMessage = {
        id: Date.now() + 1,
        content: '抱歉，我现在无法回复。请检查网络连接或稍后再试。',
        role: 'assistant',
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 Test AI Bot</h1>
        <div className="server-status">
          {serverStatus && (
            <span className={`status ${serverStatus.status}`}>
              {serverStatus.hasOpenAI ? '🟢 AI已连接' : '🟡 演示模式'}
            </span>
          )}
        </div>
      </header>

      <main className="chat-container">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>欢迎使用 Test AI Bot！</h2>
              <p>这是一个测试用的AI聊天机器人。</p>
              <p>开始对话吧！👋</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.role} ${message.isError ? 'error' : ''}`}
              >
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                    {message.usingOpenAI && <span className="ai-badge">AI</span>}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message assistant loading">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="input-form">
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="输入您的消息..."
              disabled={isLoading}
              className="message-input"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="send-button"
            >
              {isLoading ? '⏳' : '发送'}
            </button>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              className="clear-button"
            >
              清空对话
            </button>
          )}
        </form>
      </main>
    </div>
  )
}

export default App