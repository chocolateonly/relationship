//复制详情页
import { ElMessage } from "element-plus";

export const copy = (url:string) => {
    let copyInput = document.createElement('input');
    document.body.appendChild(copyInput);
    copyInput.setAttribute('value', url);
    copyInput.select();//选择input元素
    document.execCommand("Copy");//执行复制命令
    ElMessage.success('复制成功')
    copyInput.remove();//删除动态创建的节点
}