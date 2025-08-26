<template>
    <div class="bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 min-h-screen relative overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full blur-xl"></div>
        <div class="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-green-200 rounded-full blur-xl"></div>
        <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-300 to-blue-300 rounded-full blur-2xl opacity-50"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <!-- 标题区域 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent mb-6">
            {{ $t('tempmail.title') }}
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {{ $t('tempmail.description') }}
          </p>
        </div>
  
        <!-- 邮箱生成区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <!-- 邮箱生成卡片 -->
          <div class="lg:col-span-1">
            <Card class="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader class="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle class="text-gray-900 text-xl font-semibold">{{ $t('tempmail.generator.title') }}</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4 p-6">
                <!-- 当前邮箱显示 -->
                <div class="p-4 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 rounded-lg border border-green-200 shadow-inner">
                  <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-gray-600 mb-1 font-medium">{{ $t('tempmail.currentEmail') }}</p>
                      <p class="text-gray-900 font-mono text-sm truncate bg-white px-2 py-1 rounded border border-green-100" :title="currentEmail">
                        {{ currentEmail }}
                      </p>
                    </div>
                    <Button
                      @click="copyEmail"
                      size="sm"
                      variant="ghost"
                      class="ml-2 text-green-600 hover:text-green-700 hover:bg-green-100 transition-all duration-200 transform hover:scale-110"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
  
                <!-- 操作按钮 -->
                <div class="space-y-3">
                  <Button
                    @click="generateNewEmail"
                    class="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    :disabled="isGenerating"
                  >
                    <svg v-if="!isGenerating" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    {{ isGenerating ? $t('tempmail.generator.generating') : $t('tempmail.generator.generate') }}
                  </Button>
  
                  <Button
                    @click="refreshEmails"
                    variant="outline"
                    class="w-full border-green-300 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-400 shadow-md hover:shadow-lg transition-all duration-300"
                    :disabled="isRefreshing"
                  >
                    <svg v-if="!isRefreshing" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg v-else class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    {{ isRefreshing ? $t('tempmail.refreshing') : $t('tempmail.refresh') }}
                  </Button>
                </div>
  
                <!-- 统计信息 -->
                <div class="pt-4 border-t border-green-200">
                  <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200">
                      <p class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{{ emails.length }}</p>
                      <p class="text-xs text-gray-500">{{ $t('tempmail.stats.totalEmails') }}</p>
                    </div>
                    <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
                      <p class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{{ unreadCount }}</p>
                      <p class="text-xs text-gray-500">{{ $t('tempmail.stats.unread') }}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
  
          <!-- 邮件列表区域 -->
          <div class="lg:col-span-2">
            <Card class="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader class="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-gray-900 text-xl font-semibold">{{ $t('tempmail.inbox.title') }}</CardTitle>
                  <div class="text-sm text-gray-500 bg-white px-2 py-1 rounded border border-green-200">
                    {{ $t('tempmail.inbox.lastUpdate') }}: {{ lastUpdateTime }}
                  </div>
                </div>
              </CardHeader>
              <CardContent class="p-6">
                <!-- 邮件列表 -->
                <div class="space-y-3 max-h-96 overflow-y-auto">
                  <div v-if="emails.length === 0" class="text-center py-12">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-gray-600 text-lg">{{ $t('tempmail.inbox.empty') }}</p>
                    <p class="text-gray-500 text-sm mt-2">{{ $t('tempmail.inbox.emptyDescription') }}</p>
                  </div>
  
                  <div
                    v-for="email in emails"
                    :key="email.id"
                    @click="selectEmail(email)"
                    class="p-4 border border-green-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transform hover:scale-[1.02] hover:shadow-md"
                    :class="{
                      'border-green-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg': selectedEmail?.id === email.id,
                      'bg-white shadow-sm': !email.read,
                      'bg-gray-50': email.read
                    }"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <div v-if="!email.read" class="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                          <p class="text-gray-900 font-medium truncate">{{ email.subject }}</p>
                        </div>
                        <p class="text-sm text-gray-600 truncate">{{ email.sender }}</p>
                        <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ email.preview }}</p>
                      </div>
                      <div class="ml-4 text-right flex-shrink-0">
                        <p class="text-xs text-gray-500">{{ formatEmailTime(email.receivedAt) }}</p>
                        <div class="flex items-center gap-1 mt-1">
                          <svg v-if="email.hasAttachment" class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  
        <!-- 邮件详情区域 -->
        <div v-if="selectedEmail" class="mb-8">
          <Card class="bg-white/90 backdrop-blur-sm border-green-200 shadow-2xl">
            <CardHeader class="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 rounded-t-lg">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <CardTitle class="text-gray-900 text-xl mb-2 font-semibold">{{ selectedEmail.subject }}</CardTitle>
                  <div class="space-y-1 text-sm text-gray-600">
                    <p><span class="font-medium text-green-700">{{ $t('tempmail.email.from') }}:</span> {{ selectedEmail.sender }}</p>
                    <p><span class="font-medium text-green-700">{{ $t('tempmail.email.to') }}:</span> {{ currentEmail }}</p>
                    <p><span class="font-medium text-green-700">{{ $t('tempmail.email.time') }}:</span> {{ formatFullTime(selectedEmail.receivedAt) }}</p>
                  </div>
                </div>
                <Button
                  @click="closeEmail"
                  variant="ghost"
                  size="sm"
                  class="text-gray-500 hover:text-gray-700 hover:bg-green-100 transition-all duration-200 transform hover:scale-110"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent class="p-6">
              <div class="prose prose-gray max-w-none">
                <div v-html="selectedEmail.content" class="text-gray-700 leading-relaxed"></div>
              </div>
              
              <!-- 附件列表 -->
              <div v-if="selectedEmail.attachments && selectedEmail.attachments.length > 0" class="mt-6 pt-6 border-t border-green-200">
                <h4 class="text-gray-900 font-medium mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                  {{ $t('tempmail.email.attachments') }} ({{ selectedEmail.attachments.length }})
                </h4>
                <div class="space-y-2">
                  <div
                    v-for="attachment in selectedEmail.attachments"
                    :key="attachment.name"
                    class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 hover:shadow-md transition-all duration-200"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p class="text-gray-900 font-medium">{{ attachment.name }}</p>
                        <p class="text-sm text-gray-500">{{ attachment.size }}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      class="border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400 transition-all duration-200"
                    >
                      {{ $t('tempmail.email.download') }}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  
      <!-- 复制成功提示 -->
      <div
        v-if="showCopySuccess"
        class="fixed top-20 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 transform"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ $t('tempmail.copySuccess') }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '#components'
import { Button } from '#components'
import { formatTime, copyToClipboard } from '~/lib/utils'
  
  // 邮件类型定义
  interface EmailAttachment {
    name: string
    size: string
  }
  
  interface Email {
    id: string
    subject: string
    sender: string
    preview: string
    content: string
    receivedAt: Date
    read: boolean
    hasAttachment: boolean
    attachments?: EmailAttachment[]
  }
  
  // 响应式数据
  const currentEmail = ref('')
  const emails = ref<Email[]>([])
  const selectedEmail = ref<Email | null>(null)
  const isGenerating = ref(false)
  const isRefreshing = ref(false)
  const showCopySuccess = ref(false)
  const lastUpdateTime = ref('')
  const lastCheckTime = ref('')
  
  // 计算属性
  const unreadCount = computed(() => emails.value.filter((email: Email) => !email.read).length)
  
  // 自动刷新定时器
  let refreshInterval: ReturnType<typeof setInterval> | null = null
  
  // 方法
  const generateNewEmail = async () => {
    isGenerating.value = true
    
    try {
      const response = await $fetch('/api/tempmail/generate', {
        method: 'POST'
      }) as any
      
      if (response.success) {
        currentEmail.value = response.email
        emails.value = [] // 清空旧邮件
        selectedEmail.value = null
        lastCheckTime.value = new Date().toISOString()
        updateLastUpdateTime()
      }
    } catch (error) {
      console.error('生成邮箱失败:', error)
    } finally {
      isGenerating.value = false
    }
  }
  
  const refreshEmails = async () => {
    isRefreshing.value = true
    
    try {
      if (!currentEmail.value) {
        return
      }
      
      const readEmailIds = new Set(emails.value.filter((e: Email) => e.read).map((e: Email) => e.id))
      
      const response = await $fetch(`/api/tempmail/emails?email=${encodeURIComponent(currentEmail.value)}`) as any
      
      if (response.success) {
        const newEmails = response.emails.map((e: any) => ({
          ...e,
          receivedAt: new Date(e.receivedAt),
          read: readEmailIds.has(e.id)
        }))
        emails.value = newEmails
        lastCheckTime.value = new Date().toISOString()
        updateLastUpdateTime()
      }
    } catch (error) {
      console.error('刷新邮件失败:', error)
    } finally {
      isRefreshing.value = false
    }
  }
  
  const pollNewEmails = async () => {
    if (!currentEmail.value) {
      return
    }
    
    try {
      const params = new URLSearchParams({
        email: currentEmail.value
      })
      
      if (lastCheckTime.value) {
        params.append('lastCheck', lastCheckTime.value)
      }
      
      const response = await $fetch(`/api/tempmail/poll?${params.toString()}`) as any
      
      if (response.success && response.newEmails.length > 0) {
        const existingEmailIds = new Set(emails.value.map((e: Email) => e.id))
        // 将新邮件添加到现有邮件列表的开头，并过滤掉重复项
        const newEmailsWithDate = response.newEmails
          .filter((e: Email) => !existingEmailIds.has(e.id))
          .map((e: any) => ({...e, receivedAt: new Date(e.receivedAt)}))
        
        if (newEmailsWithDate.length > 0) {
          emails.value = [...newEmailsWithDate, ...emails.value]
          updateLastUpdateTime()
        }
        lastCheckTime.value = response.lastChecked
      }
    } catch (error) {
      console.error('轮询新邮件失败:', error)
    }
  }
  
  const copyEmail = async () => {
    const success = await copyToClipboard(currentEmail.value)
    if (success) {
      showCopySuccess.value = true
      setTimeout(() => {
        showCopySuccess.value = false
      }, 2000)
    }
  }
  
  const selectEmail = (email: Email) => {
    selectedEmail.value = email
    if (!email.read) {
      email.read = true
    }
  }
  
  const closeEmail = () => {
    selectedEmail.value = null
  }
  

  
  const formatEmailTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffMinutes < 1) return '刚刚'
    if (diffMinutes < 60) return `${diffMinutes}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`
    
    return date.toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })
  }
  
  const formatFullTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Shanghai'
    })
  }
  
  const updateLastUpdateTime = () => {
    lastUpdateTime.value = formatTime(new Date())
  }
  
  // 生命周期
  onMounted(async () => {
    // 初始化邮箱
    await generateNewEmail()
    
    // 设置自动轮询检查新邮件
    refreshInterval = setInterval(async () => {
      await pollNewEmails()
    }, 10000) // 每30秒检查一次新邮件，减少IMAP连接频率
  })
  
  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
  })
  </script>
  
  <style scoped>
  /* 自定义滚动条样式 */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: linear-gradient(to bottom, #f3f4f6, #ecfdf5);
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #10b981, #3b82f6);
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #059669, #2563eb);
  }
  
  /* 限制文本行数 */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* 背景动画 */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  </style>