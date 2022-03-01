import React, { useEffect, useState } from 'react';
import { useCloudStorage, useActiveCell, CellValue, useRecord, useField, useActiveViewId, FieldType, ICell, useSettingsButton } from '@vikadata/widget-sdk';
import { TextInput, Radio, RadioGroup, Button } from '@vikadata/components';



export const Setting: React.FC = () => {
  const [isShowingSettings] = useSettingsButton();
  const [showCustomContentA, setShowCustomContentA] = useState(true);
  const [showCustomContentB, setShowCustomContentB] = useState(false);
  const activeCellSync = useActiveCell();
  const [text, setText] = useCloudStorage('text', '');
  const [tab, setTab] = useCloudStorage('tab', '1');
  const [input, setInput] = useCloudStorage('input', '');

  var [activeCell, setActiveCell] = useState<ICell | undefined>(activeCellSync);
  // 当前选中记录

  // 当 activeCellSync 变化的时候，会执行中间的函数
  // 中间的函数：activeCellSync 有值，就 setActiveCell；否则就不执行
  useEffect(() => {
    activeCellSync && setActiveCell(activeCellSync)
  }, [activeCellSync])

  return isShowingSettings ? (
    <div style={{ borderLeft: "1px solid #f2f2f2", flexShrink: 0, width: '300px', paddingLeft: '14px', paddingTop: '20px', paddingRight: '14px', backgroundColor: '#fff', overflow: 'auto' }}>
      <div style={{ paddingTop: '10px', paddingBottom: "10px", overflow: 'auto', fontSize: "16px" }}>URL 配置</div>

      <div style={{ marginTop: '10px', marginBottom: '10px', fontSize: "14px" }}>
        <div>
        <RadioGroup name="btn-group-with-default" isBtn value={tab} block>
          <Radio value="1"  onChange={() => { setTab("1") }}>自定义 URL</Radio>
          <Radio value="2"  onChange={() => { setTab("2") }}>跟随 URL 单元格</Radio>
        </RadioGroup>
        {/* <Radio value="1" name="mode" checked={showCustomContentA} onChange={() => {setShowCustomContentB(false); setShowCustomContentA(true)}} />
          自定义 URL
        <Radio value="2" name="mode" checked={showCustomContentB} onChange={() => {setShowCustomContentA(false); setShowCustomContentB(true)}} />
          跟随网址单元格 */}
        </div>
        {
          tab == "1" ? <div>
            <div style={{ paddingTop: '16px', paddingBottom: "8px", overflow: 'auto' }}>预览的 URL 地址</div>
            <TextInput block onChange={ e => setInput(e.target.value) } value={input} placeholder="请输入一个 URL 地址" />
            <div style={{ paddingTop: '8px', paddingBottom: "10px", overflow: 'auto', fontSize: "16px", float:"right" }}><Button color="primary" size="small" onClick={ e => setText(input)}> 点击预览 </Button></div>
            <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}>示例：https://u.vika.cn/31ndr</div>
            {/* <div style={{ marginTop: '40px', fontSize: "13px" }}>
              <p>URL 注意事项</p >
              <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 输入 URL 时建议带上前缀 https://，否则可能会解析错误 <br /><br /> 2. 如果输入的 URL 有误，默认会渲染当前维格表 URL <br /><br />3. vika.cn 下的域名皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />4. 某些外部服务器不支持连通，如 www.baidu.com、www.google.com 等</div>
            </div> */}
          </div> :
            <span></span>
        }
        {
          tab == "2" ? <div>
            <div style={{ paddingTop: '16px', paddingBottom: "8px", overflow: 'auto' }}>预览的 URL 地址</div>
            <div style={{ height: "40px", border: "1px solid #f2f2f2", fontSize: "14px", backgroundColor: "rgb(245, 247, 250)", color: "rgb(140, 140, 140)", padding: "8px 8px" }}>请去表格激活一个网址类型的单元格</div>
            <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}>仅会在激活「网址类型」的单元格时渲染页面，激活其他类型的字段时不会渲染</div>
            {/* <div style={{ marginTop: '40px', fontSize: "13px" }}>
              <p>URL 注意事项</p >
              <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 建议在 URL 中带上前缀 https://，否则可能会解析错误 <br /><br /> 2. 如果输入的 URL 有误，默认会渲染当前维格表 URL <br /><br />3. vika.cn 下的域名皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />4. 某些外部服务器不支持连通，如 www.baidu.com、www.google.com 等 </div>
            </div> */}
          </div> :
            <span></span>
        }
        <div style={{ marginTop: '40px', fontSize: "13px" }}>
              <p>URL 注意事项</p >
              <div style={{ marginTop: '8px', fontSize: "12px", color: "rgb(140, 140, 140)" }}> 1. 建议在 URL 中带上前缀 https://，否则可能会解析错误 <br /><br /> 2. 如果输入的 URL 有误，默认会渲染当前维格表 URL <br /><br />3. vika.cn 下的域名皆支持预览，比如神奇表单、维格表的分享链接等 <br /><br />4. 某些外部服务器不支持连通，如 www.baidu.com、www.google.com 等 </div>
        </div>
      </div>
    </div>
  ) : null;
};

