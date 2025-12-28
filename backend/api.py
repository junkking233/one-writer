from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from plantuml import PlantUML
import os
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 配置
UPLOAD_FOLDER = 'generated_diagrams'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# PlantUML 服务器
plantuml_server = PlantUML(url='http://www.plantuml.com/plantuml/img/')

@app.route('/api/generate-uml', methods=['POST'])
def generate_uml():
    """生成UML图表"""
    try:
        data = request.get_json()
        uml_code = data.get('content', '')
        
        if not uml_code.strip():
            return jsonify({'error': '请提供UML代码'}), 400
        
        # 生成唯一文件名
        filename = f'diagram_{uuid.uuid4().hex[:8]}_{datetime.now().strftime("%Y%m%d%H%M%S")}.png'
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        
        # 生成图片
        result = plantuml_server.processes(uml_code)
        
        # 保存文件
        with open(filepath, 'wb') as f:
            f.write(result)
        
        # 返回文件URL
        return jsonify({
            'success': True,
            'filename': filename,
            'url': f'/api/diagram/{filename}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/diagram/<filename>', methods=['GET'])
def get_diagram(filename):
    """获取生成的图表"""
    try:
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        if os.path.exists(filepath):
            return send_file(filepath, mimetype='image/png')
        else:
            return jsonify({'error': '文件不存在'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """健康检查"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    print("🚀 UML图表生成服务启动中...")
    print("📍 服务地址: http://localhost:8000")
    print("=" * 50)
    app.run(host='0.0.0.0', port=8000, debug=True)
