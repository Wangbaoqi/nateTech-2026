# 01_tokenizer.py - 字符级分词器 MVP
# 目标：理解 Tokenization 的本质（映射）

class SimpleTokenizer:
    def __init__(self):
        self.char_to_id = {}
        self.id_to_char = {}
        self.vocab_size = 0

    def train(self, text):
        """
        构建词表：扫描文本，建立字符到ID的映射
        """
        # 1. 找出所有不重复的字符，并排序
        unique_chars = sorted(list(set(text)))
        self.vocab_size = len(unique_chars)
        
        # 2. 建立映射表
        # enumerate 会产生索引和值：(0, 'a'), (1, 'b')...
        for idx, char in enumerate(unique_chars):
            self.char_to_id[char] = idx
            self.id_to_char[idx] = char
            
        print(f"✅ 训练完成！词表大小: {self.vocab_size}")
        print(f"词表预览: {unique_chars[:10]} ...")

    def encode(self, text):
        """
        编码：String -> List[Int]
        """
        ids = []
        for char in text:
            if char in self.char_to_id:
                ids.append(self.char_to_id[char])
            else:
                # 处理未知字符 (这里简单处理，实际会用 <UNK> token)
                print(f"⚠️ 警告: 未知字符 '{char}'，跳过。")
        return ids

    def decode(self, ids):
        """
        解码：List[Int] -> String
        """
        chars = []
        for i in ids:
            if i in self.id_to_char:
                chars.append(self.id_to_char[i])
            else:
                chars.append("?")
        return "".join(chars)

# --- 主程序执行 ---

if __name__ == "__main__":
    # 1. 准备训练数据 (语料库)
    corpus = "Hello AI World! This is a simple tokenizer written by NateWang."
    
    # 2. 初始化并训练
    tokenizer = SimpleTokenizer()
    tokenizer.train(corpus)
    
    # 3. 测试编码 (Encode)
    input_text = "Hello AI"
    encoded_ids = tokenizer.encode(input_text)
    print(f"\n原文: '{input_text}'")
    print(f"Token IDs: {encoded_ids}")
    
    # 4. 测试解码 (Decode)
    decoded_text = tokenizer.decode(encoded_ids)
    print(f"解码回原文: '{decoded_text}'")
    
    # 5. 验证一致性
    assert input_text == decoded_text, "❌ 编解码不一致！"
    print("\n✅ 测试通过：编解码完美还原。")
