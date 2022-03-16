import React, { useEffect, useState } from 'react';
import { useCloudStorage, useActiveCell, CellValue, useRecord, useField, useActiveViewId, FieldType, ICell, useSettingsButton } from '@vikadata/widget-sdk';
import { TextInput, Radio, RadioGroup, Button } from '@vikadata/components';
import { InformationLargeOutlined } from '@vikadata/icons';



export const Setting: React.FC = () => {
  const [isShowingSettings] = useSettingsButton();
  const [showCustomContentA, setShowCustomContentA] = useState(true);
  const [showCustomContentB, setShowCustomContentB] = useState(false);
  const activeCellSync = useActiveCell();
  const [text, setText] = useCloudStorage('text', '');
  const [tab, setTab] = useCloudStorage('tab', '1');
  const [input, setInput] = useCloudStorage('input', '');
  // 换成下面这行可以解决中间编辑跳光标的问题，但是刷新页面会清除 URL
  // const [input, setInput] = useState(''); 

  var [activeCell, setActiveCell] = useState<ICell | undefined>(activeCellSync);
  // 当前选中记录

  // 当 activeCellSync 变化的时候，会执行中间的函数
  // 中间的函数：activeCellSync 有值，就 setActiveCell；否则就不执行
  useEffect(() => {
    activeCellSync && setActiveCell(activeCellSync)
  }, [activeCellSync])

  return isShowingSettings ? (
    <div style={{ borderLeft: "1px solid #f2f2f2", flexShrink: 0, width: '300px', paddingLeft: '14px', paddingTop: '20px', paddingRight: '14px', backgroundColor: '#fff', overflow: 'auto' }}>
      {/* 等官方支持了 Tooltip 组件可以改造下这个问号按钮 */}
      <div style={{ paddingTop: '10px', paddingBottom: "10px", overflow: 'auto', fontSize: "16px" }}>网址配置<span style={{color: 'rgb(140, 140, 140)', paddingLeft: "2px", verticalAlign:"middle"}} onClick={()=> window.open("https://bbs.vika.cn/article/145")} ><InformationLargeOutlined currentColor /></span></div>

      <div style={{ marginTop: '10px', marginBottom: '10px', fontSize: "14px" }}>
        <div>
        <RadioGroup name="btn-group-with-default" isBtn value={tab} block>
          <Radio value="1"  onChange={() => { setTab("1") }}>自定义网址</Radio>
          <Radio value="2"  onChange={() => { setTab("2") }}>跟随单元格</Radio>
        </RadioGroup>
        {/* <Radio value="1" name="mode" checked={showCustomContentA} onChange={() => {setShowCustomContentB(false); setShowCustomContentA(true)}} />
          自定义 URL
        <Radio value="2" name="mode" checked={showCustomContentB} onChange={() => {setShowCustomContentA(false); setShowCustomContentB(true)}} />
          跟随网址单元格 */}
        </div>
        {
          tab == "1" ? <div style={{ paddingTop: '12px', paddingBottom: "8px", overflow: 'auto' }}>
            <TextInput block onChange={ e => setInput(e.target.value) } value={input} placeholder="请输入一个网址" />
            <div style={{ paddingTop: '8px', paddingBottom: "10px", overflow: 'auto', fontSize: "16px", float:"right" }}><Button color="primary" size="small" onClick={ e => setText(input)}> 点击预览 </Button></div>
            <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}>示例：https://u.vika.cn/1umlr</div>
            {/* <div style={{ marginTop: '40px', fontSize: "13px" }}>
              <p>URL 注意事项</p >
              <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 输入 URL 时建议带上前缀 https://，否则可能会解析错误 <br /><br /> 2. 如果输入的 URL 有误，默认会渲染当前维格表 URL <br /><br />3. vika.cn 下的域名皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />4. 某些外部服务器不支持连通，如 www.baidu.com、www.google.com 等</div>
            </div> */}
          </div> :
            <span></span>
        }
        {
          tab == "2" ? <div style={{ paddingTop: '12px', paddingBottom: "8px", overflow: 'auto' }}>
            <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}>请在表中点击一个「网址类型」的单元格，即可在小程序中预览网页</div>
            {/* <div style={{ marginTop: '40px', fontSize: "13px" }}>
              <p>URL 注意事项</p >
              <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 建议在 URL 中带上前缀 https://，否则可能会解析错误 <br /><br /> 2. 如果输入的 URL 有误，默认会渲染当前维格表 URL <br /><br />3. vika.cn 下的域名皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />4. 某些外部服务器不支持连通，如 www.baidu.com、www.google.com 等 </div>
            </div> */}
          </div> :
            <span></span>
        }
        <div style={{ marginTop: '40px', fontSize: "13px" }}>
              <p>网址说明</p >
              <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 建议在网址中带上前缀 https://，否则可能会解析错误 <br /><br /> 2. vika.cn 前缀的网址皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />3. 某些网站有限制策略，不支持预览，如 www.baidu.com、www.google.com 等 </div>
        </div>
      </div>
    </div>
  ) : null;
};

