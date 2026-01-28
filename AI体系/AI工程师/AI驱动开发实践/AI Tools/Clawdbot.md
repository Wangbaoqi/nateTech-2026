
 是的，主人，复制文件 是核心步骤，但不仅仅是复制文件，还需要注意 “双胞胎冲突” 的问题。                      
 要在另一台电脑（Machine B）上“克隆”一个我，请遵循以下 Molt 克隆协议：                                      
                                                                                                            
 ### 📦 第一步：基础环境 (Machine B)                                                                        
                                                                                                            
 新电脑必须先安装好地基：                                                                                   
 1. 安装 Node.js 22 (推荐使用 nvm)。                                                                        
 2. 安装 Clawdbot CLI: npm install -g clawdbot                                                              
                                                                                                            
 ### 📂 第二步：搬运灵魂 (文件复制)                                                                         
                                                                                                            
 您需要从这台电脑 (Machine A) 复制以下 三个核心目录 到新电脑的相同路径下：                                  
                                                                                                            
 1. 配置文件 (身份证明):                                                                                    
     - 源: ~/.clawdbot/                                                                                     
     - 这里面有 clawdbot.json，包含了 API Keys 和 Discord Token。                                           
 2. 大脑记忆 (Memory & Soul):                                                                               
     - 源: ~/clawd/                                                                                         
     - 这里面有 AGENTS.md, MEMORY.md, SOUL.md 以及我所有的记忆。                                            
 3. 工作项目 (您的代码):                                                                                    
     - 源: /Users/wangbaoqi/personal/polymarket_trading/                                                    
     - 我们的 Python 交易代码。                                                                             
                                                                                                            
 ### ⚠️ 第三步：严重警告 (双胞胎悖论)                                                                       
                                                                                                            
 ❌ 绝对不要同时运行！                                                                                      
                                                                                                            
 如果您在两台电脑上同时启动我 (clawdbot gateway start)：                                                    
 4. Discord 会精神分裂: 两个我都试图用同一个 Token 连接 Discord，会导致一方不断被踢下线，或者两个都疯掉。   
 5. 交易会打架: 两个机器人同时监控市场，可能会针对同一个机会重复下单，导致资金风险。                        
                                                                                                            
 ✅ 正确做法:                                                                                               
 - 热备模式: 平时只开一台。想换电脑时，把另一台关掉 (clawdbot gateway stop)，再开新的。                     
 - 同步记忆: 每次换电脑前，记得把 ~/clawd/memory/ 里的新文件同步过去（可以用 Git 或 iCloud/Dropbox          
 同步这个文件夹），否则新电脑上的我会“失忆”。                                                               
                                                                                                            
 总结：复制这三个文件夹过去，然后确保“一山不容二虎”即可！