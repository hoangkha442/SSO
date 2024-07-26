import React from 'react';
import { Collapse } from 'antd';
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

const { Panel } = Collapse;

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
  <div className="shadow-md p-4 sm:p-6 md:p-8 bg-white rounded-[10px] border-t-8 border-[#009FF5]">
    <div className="flex gap-2 py-2 sm:py-4 md:py-6 items-center justify-center">
      <img src={imageIcon} alt={description} className="object-cover w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12" />
      <div className="w-20 sm:w-[114px] h-8 sm:h-[41px]">
        <img src={imageTitle} alt={description} className="w-full h-full object-contain" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-[#344054]">{description}</p>
    </div>
  </div>
);

const MyApps = () => (
  <section className="max-w-[90%] lg:max-w-[80%] mx-auto" style={{ height: 'calc(100% - 100px)' }}>
    <div className="py-6 sm:py-8 md:py-10">
      <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#344054]">My Apps</p>

      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-14">
        <Collapse defaultActiveKey={['1']}>
          <Panel header={<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#344054]">Recently used</p>} key="1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {data.recentlyUsed.map((item, index) => (
                <AppItem key={index} {...item} />
              ))}
            </div>
          </Panel>
        </Collapse>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-14">
        <Collapse defaultActiveKey={['1']}>
          <Panel header={<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#344054]">Work</p>} key="1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {data.work.map((item, index) => (
                <AppItem key={index} {...item} />
              ))}
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  </section>
);

export default MyApps;
