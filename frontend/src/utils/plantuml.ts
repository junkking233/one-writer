import plantumlEncoder from 'plantuml-encoder'

/**
 * 将 PlantUML 代码编码为 URL 路径
 * @param umlCode PlantUML 源码
 * @returns 编码后的字符串
 */
export const encodePlantUML = (umlCode: string): string => {
    return plantumlEncoder.encode(umlCode)
}

/**
 * 获取 PlantUML 图片完整 URL
 * @param umlCode PlantUML 源码
 * @param format 输出格式 (img, svg, txt)
 * @returns 完整的图片 URL
 */
export const getPlantUMLUrl = (umlCode: string, format: string = 'img'): string => {
    const encoded = encodePlantUML(umlCode)
    return `https://www.plantuml.com/plantuml/${format}/${encoded}`
}
