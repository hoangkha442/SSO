import React from 'react';
import { Collapse } from 'antd';
import { AiOutlineHome, AiOutlineDown, AiOutlineUp, AiOutlinePlus } from 'react-icons/ai';
import zimbraTitle from '../../assets/zimbraTitle.png';
import zimbraIcon from '../../assets/zimbraIcon.png';
import figmaTitle from '../../assets/figmaTitle.png';
import figmaIcon from '../../assets/figmaIcon.png';
import splunkTitle from '../../assets/splunkTitle.png';
import splunkIcon from '../../assets/splunkIcon.png';
import mycrosoftTeamIcon from '../../assets/mycrosoftTeamIcon.png';
import mycrosoftTeamTitle from '../../assets/mycrosoftTeamTitle.png';
import discordTitle from '../../assets/discordTitle.png';
import discordIcon from '../../assets/discordIcon.png';

const data = {
  recentlyUsed: [
    { imageTitle: zimbraTitle, imageIcon: zimbraIcon, description: 'Zimbra' },
    { imageTitle: figmaTitle, imageIcon: figmaIcon, description: 'Figma' },
    { imageTitle: splunkTitle, imageIcon: splunkIcon, description: 'Splunk' },
    { imageTitle: zimbraTitle, imageIcon: zimbraIcon, description: 'Zimbra' },
  ],
  work: [
    { imageTitle: mycrosoftTeamTitle, imageIcon: mycrosoftTeamIcon, description: 'Microsoft Teams' },
    { imageTitle: discordTitle, imageIcon: discordIcon, description: 'Discord' },
    { imageTitle: zimbraTitle, imageIcon: zimbraIcon, description: 'Zimbra' },
    { imageTitle: zimbraTitle, imageIcon: zimbraIcon, description: 'Zimbra' },
  ],
};

const AppItem = ({ imageTitle, imageIcon, description }) => (
  <div className="shadow-md p-8 bg-white rounded-[10px] border-t-8 border-[#009FF5]">
    <div className="flex gap-2 py-6 items-center">
      <img src={imageIcon} alt="" className="object-cover w-10 h-10" />
      <div className="w-[114px] h-[41px]">
        <img src={imageTitle} alt="" className="w-full h-full object-contain" />
      </div>
    </div>
    <div className="text-xl text-[#344054] text-center">
      <p>{description}</p>
    </div>
  </div>
);

const MyApps = () => (
  <section className="max-w-[80%] mx-auto" style={{ height: 'calc(100vh - 100px)' }}>
    <div className="py-10">
      <p className="font-bold text-[28px] text-[#344054]">My Apps</p>

      <div className="mt-14">
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={<p className="text-[#344054] text-2xl">Recently used</p>} key="1">
            <div className="flex flex-wrap gap-6">
              {data.recentlyUsed.map((item, index) => (
                <AppItem key={index} {...item} />
              ))}
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>

      <div className="mt-10">
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={<p className="text-[#344054] text-2xl">Work</p>} key="1">
            <div className="flex flex-wrap gap-6">
              {data.work.map((item, index) => (
                <AppItem key={index} {...item} />
              ))}
            </div>
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  </section>
);

export default MyApps;
