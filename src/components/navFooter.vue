<template>
  <div class="main">
    <div class="top">
      <div class="box">
        <div>选购指南</div>
        <div>手机</div>
        <div>电视</div>
        <div>笔记本</div>
        <div>平板</div>
        <div>穿戴</div>
        <div>耳机</div>
        <div>家电</div>
        <div>路由器</div>
        <div>音信</div>
        <div>配件</div>
      </div>
      <div class="box">
        <div>服务中心</div>
        <div>申请售后</div>
        <div>售后政策</div>
        <div>维修服务价格</div>
        <div>订单查询</div>
        <div>以旧换新</div>
        <div>保障服务</div>
        <div>防伪查询</div>
        <div>F码通道</div>
      </div>
      <div class="box">
        <div>线下门店</div>
        <div>小米之家</div>
        <div>服务网点</div>
        <div>授权体验店/专区</div>
      </div>
      <div class="box">
        <div>关于小米</div>
        <div>了解小米</div>
        <div>加入小米</div>
        <div>投资者关系</div>
        <div>环境，社会及管治</div>
        <div>廉洁举报</div>
      </div>
      <div class="box">
        <div>关注我们</div>
        <div>新浪微博</div>
        <div>官方微信</div>
        <div>联系我们</div>
        <div>公益基金会</div>
      </div>
      <div class="line"></div>
      <div class="phone">
        <div>400-100-5678</div>
        <div>8:00-18:00(仅收市话费)</div>
        <div><i class="el-icon-chat-dot-square"></i>人工客服</div>
      </div>
    </div>
    <div class="bottom">
      <div style="display:flex;justify-content: center;">
        <div><img src="../assets/logo.png" alt="" width="100"></div>
        <div class="font">
          <div>小米商城 | MIUI | 米家 | 米聊 | 多看 | 游戏 | 政企服务 | 小米天猫店 | 小米集团隐私政策 | 小米公司儿童信息保护规则
            | 小米商城隐私政策 | 小米商城用户协议 | 问题反馈 | Select Location
          </div>
          <div>北京互联网法院法律服务工作站 | 中国消费者协会 | 北京市消费者协会</div>
          <div>© mi.com 京ICP证110507号 京ICP备10046444号 京公网安备11010802020134号 京网文[2020]0276-042号</div>
          <div>（京）网械平台备字（2018）第00005号 互联网药品信息服务资格证 (京)-非经营性-2014-0090 营业执照
            医疗器械质量公告
          </div>
          <div>增值电信业务许可证 网络食品经营备案 京食药网食备202010048 食品经营许可证</div>
          <div>违法和不良信息举报电话：171-5104-4404 知识产权侵权投诉
            本网站所列数据，除特殊说明，所有数据均出自我司实验室测试
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content: center;margin-top: 20px;font-size: 20px;opacity: 0.5;">
        让全球每个人都能享受科技带来的美好生活
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    width: 100%;
    justify-content: center;

    .box {
      display: flex;
      flex-direction: column;
      margin-right: 100px;

      div:nth-child(1) {
        font-size: 14px;
        margin: 30px 0;
      }

      div:nth-child(n + 2) {
        font-size: 12px;
        color: #757575;
        margin-bottom: 10px;

        &:hover {
          cursor: pointer;
          color: #ff7800;
        }
      }
    }

    .line {
      margin-top: 30px;
      height: 100px;
      width: 1px;
      background: #757575;
      margin-right: 50px;
    }

    .phone {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;

      div:nth-child(1) {
        font-size: 22px;
        color: #ff7800;
      }

      div:nth-child(2) {
        font-size: 12px;
        color: #616161;
      }

      div:nth-child(3) {
        font-size: 12px;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ff7800;
        border: 1px solid #ff7800;
        cursor: pointer;

        &:hover {
          background-color: #ff7800;
          color: #ffffff;
        }
      }
    }
  }

  .bottom {
    width: 100%;
    background: #FAFAFA;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    font-size: 12px;
    color: #757575;

    .font {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>