import React from 'react';
import { useCloudStorage } from '@vikadata/widget-sdk';
import { useSettingsButton } from '@vikadata/widget-sdk';
import { TextInput } from '@vikadata/components';

export const Setting: React.FC = () => {
  const [isShowingSettings] = useSettingsButton();
  const [text, setText] = useCloudStorage('text', '');

  return isShowingSettings ? (
    <div style={{ flexShrink: 0, width: '300px', paddingLeft: '14px', paddingTop: '20px', paddingRight: '16px', backgroundColor: '#fff', overflow: 'auto' }}>
      <div style={{ paddingTop: '10px', paddingBottom:"10px", overflow: 'auto', fontSize: "16px" }}>URL 预览配置</div>
      <div style={{ marginTop: '10px', fontSize: "14px" }}>
        <p>预览的 URL 地址</p>
        <TextInput onChange={e => setText(e.target.value)} value={text} placeholder="请输入一个 URL 地址"/>
        <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}>URL 示例：https://u.vika.cn/31ndr</div>
      </div>
      <div style={{ marginTop: '40px', fontSize: "13px" }}>
        <p>使用说明</p>
        <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 输入 URL 时建议带上前缀 https://，否则可能会解析错误 <br /><br /> 2. 如果输入的 URL 有误，默认会渲染当前维格表 URL <br /><br />3. vika.cn 下的域名皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />4. 某些外部服务器不支持连通，如 www.baidu.com、www.google.com 等
        </div>
      </div>
    </div>
  ) : null;
};
