from plantuml import PlantUML
import sys

class SimpleUMLGenerator:
    def __init__(self):
        # 创建 PlantUML 实例
        self.server = PlantUML(url='http://www.plantuml.com/plantuml/img/')
        self.file_counter = 1
    
    def generate_diagram(self, uml_code):
        """生成 UML 图表"""
        try:
            # 生成图片
            result = self.server.processes(uml_code)
            
            # 保存文件
            filename = f'diagram_{self.file_counter}.png'
            with open(filename, 'wb') as f:
                f.write(result)
            
            print(f"✅ 图表生成成功！文件名: {filename}")
            self.file_counter += 1
            return True
            
        except Exception as e:
            print(f"❌ 生成失败: {e}")
            return False
    
    def run(self):
        """运行交互式生成器"""
        print("🎨 简单 UML 图表生成工具")
        print("=" * 40)
        print("使用说明：")
        print("1. 粘贴你的 UML 代码（可以多行）")
        print("2. 粘贴完成后按 Ctrl+D (Linux/Mac) 或 Ctrl+Z+Enter (Windows) 直接生成")
        print("3. 输入 'q' 退出程序")
        print("=" * 40)
        
        while True:
            print("\n请粘贴 UML 代码 (输入 'q' 退出):")
            
            try:
                # 读取多行输入直到 EOF
                uml_lines = []
                for line in sys.stdin:
                    line = line.rstrip('\n\r')
                    if line.lower() == 'q':
                        print("👋 再见！")
                        return
                    uml_lines.append(line)
                
                uml_code = '\n'.join(uml_lines)
                
                if uml_code.strip():
                    print("🚀 正在生成图表...")
                    self.generate_diagram(uml_code)
                else:
                    print("❌ UML 代码不能为空")
                    
            except EOFError:
                # 用户按了 Ctrl+D，继续下一轮输入
                continue
            except KeyboardInterrupt:
                print("\n👋 再见！")
                break

def main():
    generator = SimpleUMLGenerator()
    generator.run()

if __name__ == "__main__":
    main()