<template>
  <div class="html5-primary">
    <p>基础控件的测试内容</p>    
    <div class="row-1">
      <div class="select-wrapper">
          <!-- https://stackoverflow.com/questions/10484053/change-select-list-option-background-colour-on-hover -->
          <!-- 这是唯一看到的一个实现效果，原理还不太清楚 -->
          <!-- See a single select tag cannot be styled as the control goes to system. Here what is done is on click, the select gets changed to multiple select using size. There is no restriction on multiple select, so the style works. Brilliant -->
          <select onfocus="this.size=10;" onblur="this.size=0;" onchange="this.size=1;this.blur();">
              <option v-for="item in options" :key="item">
                  {{item}}
              </option>
          </select>
      </div>
      <div class="images">
        <img src="../../assets/loading.svg" draggable="false">
      </div>
      <div class="scroll-div">
        <div class="scroll-custom">
          <p v-for="it in 20" :key="it" v-html="it"></p>
        </div>
        <div class="images">
          <p>chrome浏览器的样式</p>
          <img src="/images/scrollbar-style.jpg" />
          <img src="/images/scrollbar-color.jpg" />
        </div>
      </div>
      <div class="scroll-table">
        <div id="scrollTableContainer">
          <div id="tHeadContainer">
              <table id="tHead">
                  <tr>
                      <td>Name</td>
                      <td>Operator</td>
                      <td>Began operation</td>
                      <td>Tonnage</td>
                      <td>Status</td>
                  </tr>
              </table>
          </div><!-- tHeadContainer -->
          <div id="tBodyContainer">
              <table id="tBody">
                  <tr>
                      <td>Seabourne Sun</td>
                      <td>Seabourn Cruise Line</td>
                      <td>1988</td>
                      <td>?</td>
                      <td>Ended service in 2002, currently operating as Prinsendam</td>
                  </tr>
                  <tr>
                      <td>Adventures of the Seas</td>
                      <td>Royal Caribbean International</td>
                      <td>2001</td>
                      <td>138,000</td>
                      <td>Operating</td>
                  </tr>
                  <tr>
                      <td>Oceanic Independence</td>
                      <td>American Hawaiian Cruises / American Global Line</td>
                      <td>1974</td>
                      <td>23,719</td>
                      <td>Named formerly (1951-1974) and subsequently renamed (1982-2006) the Independence, renamed the Oceanic (2006), sold for scrap in 2008 but remains in mothballs</td>
                  </tr>
                  <tr>
                      <td>Cunard Ambassador</td>
                      <td>Cunard Line</td>
                      <td>1972</td>
                      <td>14,160</td>
                      <td>Burnt 1974, rebuilt into a livestock carrier, renamed Linda Clausen, later Procyon, Raslan. Scrapped 1984 after a second fire.</td>
                  </tr>
                  <tr>
                      <td>Aegean Beauty</td>
                      <td>Voyages to Antiquity</td>
                      <td>1973</td>
                      <td>11,563</td>
                      <td>Formerly Aegean Dolphin and Aegean I. Operating</td>
                  </tr>
                  <tr>
                      <td>Serenade of the Seas</td>
                      <td>Royal Caribbean International</td>
                      <td>2003</td>
                      <td>90,090</td>
                      <td>Operating</td>
                  </tr>
                  <tr>
                      <td>Queen Elizabeth 2</td>
                      <td>Cunard Line</td>
                      <td>1969</td>
                      <td>70,327</td>
                      <td>Left fleet in November 2008</td>
                  </tr>
                  <tr>
                      <td>National Geographic Endeavour</td>
                      <td>Lindblad Expeditions</td>
                      <td>1996</td>
                      <td></td>
                      <td>Operating, also known as Endeavour</td>
                  </tr>
                  <tr class="lastRow">
                      <td>Liberty of the Seas</td>
                      <td>Royal Caribbean International</td>
                      <td>2007</td>
                      <td>154,407</td>
                      <td>Operating</td>
                  </tr>
              </table>
          </div><!-- tBodyContainer -->
        </div><!-- scrollTableContainer -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Html5.Primary',
  setup: () => {    
    const options = [ 1, 2, 3, 4, 5, 6]
    return { 
      options,
    }
  }
})
</script>

<style lang="scss" scoped>
.html5-primary {
  width: 100%;
  // height: 100%;
  .row-1 {
    display: flex;
    .select-wrapper {
        select {
            &>option {
                &:checked {
                  background-color: green;
                }
                &:hover {
                  background-color: red;
                  cursor: pointer;
                  box-shadow: 0 0 10px 100px #1882a8 inset;
                }
            }
        }
    }
    .images {
      width: 200px;
      height: 200px;
    }
    .scroll-div {
      .scroll-custom {
        $scroll-box-shadow-color: rgba(0, 0, 0, 0.1);
        $scroll-thumb-color: rgba(0, 0, 0, 0.5);
        $scroll-thumb-hover-color: rgba(0, 0, 0, 0.2);
        $scroll-size: 6px;
        width: 300px;
        height: 200px;
        // background: #1882a8;
        overflow: auto;
        margin-left: 100px;
        border: 1px solid #000;
        &::-webkit-scrollbar {
          width: $scroll-size;
        }
        /* 正常情况下的滑块样式 */
        &::-webkit-scrollbar-thumb {
          background-color: $scroll-thumb-color;
          border-radius: $scroll-size;
          box-shadow: inset 1px 1px 0 $scroll-box-shadow-color;
        }
        /* 鼠标悬浮在该类指向的控件上时滑块的样式 */
        &:hover::-webkit-scrollbar-thumb {
          background-color: $scroll-thumb-hover-color;
          border-radius: $scroll-size;
          box-shadow: inset 1px 1px 0 $scroll-box-shadow-color;
        }    
        /* 鼠标悬浮在滑块上时滑块的样式 */
        &::-webkit-scrollbar-thumb:hover {
          background-color: $scroll-thumb-hover-color;
          box-shadow: inset 1px 1px 0 $scroll-box-shadow-color;
        }        
        /* 正常时候的主干部分 */
        &::-webkit-scrollbar-track {
          // border-radius: $scroll-size;
          // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
          // background-color: white;
        }            
        /* 鼠标悬浮在滚动条上的主干部分 */
        &::-webkit-scrollbar-track:hover {
          // box-shadow: inset 0 0 6px rgba(0, 0, 0, .4);
          // background-color: rgba(0, 0, 0, .01);
        }
      }
      .images {
        display: flex;
        .img {
          max-height: 100px;
        }
      }
    }
    .scroll-table {
      * {
          padding: 0;
          margin: 0;
          box-sizing: border-box; /* in case block elements are used inside table cells */
      }
      table {
          border-collapse: collapse;
          table-layout: fixed;
          empty-cells: show;
      }
      td {
          border: 1px solid black;
          padding: 4px;
      }
      div#scrollTableContainer {
          width: 617px;
          margin: 40px; /* just for presentation purposes */
          border: 1px solid black;
      }
      .touchScreen div#scrollTableContainer {
          width: 600px; /* touch devices do not form scrollbars (= 17 px wide) */
      }
      #tHeadContainer {
          background: #CC3600;
          color: white;
          font-weight: bold;
      }
      #tBodyContainer {
          height: 240px;
          overflow-y: scroll;
      }
      .touchScreen #tBodyContainer {
          -webkit-overflow-scrolling: touch; /* smooths scrolling on touch screens */
      }
          /* FINER LAYOUT MATTERS: */
      tr:first-child td {
          border-top: 0;
      }
      #tBody tr.lastRow td {
          border-bottom: 0;
      }
      td:first-child {
          min-width: 108px; /* Firefox needs min- and max-widths */
          max-width: 108px;
          border-left: 0;
      }
      td:first-child + td {
          min-width: 125px;
          max-width: 125px;
      }
      td:first-child + td + td {
          min-width: 90px;
          max-width: 90px;
      }
      td:first-child + td + td + td {
          min-width: 95px;
          max-width: 95px;
      }
      td:first-child + td + td + td + td {
          width: 180px; /* here, Firefox messes up with only min- and max-widths */
          border-right: 0;
      }
          /* AND SOME CSS TO INFORM TOUCH SCREEN USERS: */
      p#touchDeviceText {
          display: none;
      }
      .touchScreen p#touchDeviceText {
          display: block;
      }
    }
  }
}
</style>
