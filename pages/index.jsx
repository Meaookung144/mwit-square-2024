import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPeopleGroup,
  faBook,
  faTrophy,
  faCalendarDay,
  faImagePortrait,
  faIdCard,
  faChalkboardTeacher,
  faFileCircleCheck,
  faEnvelope,
  faEarthAsia,
  faClipboardCheck,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFileWord,
  faFilePdf,
  faFileLines,
} from '@fortawesome/free-regular-svg-icons'
import {
  faFacebook,
  faFacebookMessenger,
} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

const share = [
  {
    icon: faFacebook,
    href: 'https://facebook.com/mwitsquare',
    name: 'MWIT Square',
  },
  {
    icon: faFacebookMessenger,
    href: 'https://m.me/mwitsquare',
    name: 'MWIT Square',
  },
  {
    icon: faEnvelope,
    href: 'mailto:square@mwit.ac.th',
    name: 'square@mwit.ac.th',
  },
  // {
  //   icon: faFacebook,
  //   href: 'https://facebook.com/MWITOpenHouse',
  //   name: 'MWIT Open House',
  // },
  {
    icon: faEarthAsia,
    href: 'https://openhouse.mwit.ac.th',
    name: 'openhouse.mwit.ac.th',
  },
  {
    icon: faEarthAsia,
    href: 'https://mwit.ac.th',
    name: 'mwit.ac.th',
  },
]

const ctInfo = [
  {
    icon: faCalendarDay,
    text: 'แข่งขันวันเสาร์ที่ 27 สิงหาคม 2565 ในรูปแบบออนไลน์',
  },
  {
    icon: faPeopleGroup,
    text: 'แต่ละโรงเรียนส่งนักเรียนเข้าร่วมได้ไม่เกิน 2 ทีม ทีมละ 3 คน',
  },
  {
    icon: faBook,
    text: 'แข่งขันทั้งหมด 2 รอบ ได้แก่ รอบคัดเลือก และรอบชิงชนะเลิศ',
  },
  {
    icon: faTrophy,
    text: 'ได้รับเกียรติบัตรและทุนการศึกษาสูงสุด 5,000 บาท',
  },
]

const doc = [
  {
    icon: faImagePortrait,
    text: 'รูปถ่ายนักเรียน',
    desc: 'และรูปอาจารย์ผู้คุมทีม',
  },
  {
    icon: faIdCard,
    text: 'รูปถ่ายบัตรนักเรียน',
  },
  {
    icon: faFileCircleCheck,
    text: 'เอกสารคำรับรองสถานศึกษา',
    desc: '(ดาวน์โหลดแบบฟอร์มได้จากส่วนบนของเว็บไซต์)',
  },
]

const awardList = [
  {
    name: 'รางวัลชนะเลิศ',
    sub: 'ทุนการศึกษา 5,000 บาท',
    std: [
      'เด็กหญิงพิชชาญาณ์ เพชรศรีทอง',
      'เด็กหญิงฐิติธรณ์ สุวรรณนิตย์',
      'เด็กหญิงสุทธิกมล ศรีทองสุข',
    ],
    school: 'โรงเรียนธิดานุเคราะห์',
    img: '/img/1st.jpg',
  },
  {
    name: 'รางวัลรองชนะเลิศอันดับ 1',
    sub: 'ทุนการศึกษา 3,000 บาท',
    std: [
      'เด็กชายกศิเดช วิสัยชนม์',
      'เด็กชายภูริพัฒน์ บุญชู',
      'เด็กชายอัฐ วนศิริพงศ์',
    ],
    school: 'โรงเรียนแสงทองวิทยา',
    img: '/img/2nd.jpg',
  },
  {
    name: 'รางวัลรองชนะเลิศอันดับ 2',
    sub: 'ทุนการศึกษา 2,000 บาท',
    std: [
      'เด็กหญิงกัญญ์ณพัชร์ ลาภณรงค์ชัย',
      'เด็กหญิงชนัญชิดา สุขไชยะ',
      'เด็กหญิงภัคธดา พิธาวราธร',
    ],
    school: 'โรงเรียนธิดานุเคราะห์',
    img: '/img/3rd.jpg',
  },
]

const firstResult = [
  ['ทีม', 'โรงเรียน'],
  ['M16A', 'ธิดานุเคราะห์'],
  ['M16B', 'ธิดานุเคราะห์'],
  ['M32B', 'มงฟอร์ตวิทยาลัย แผนกมัธยม'],
  ['M39A', 'ราชสีมาวิทยาลัย'],
  ['M60A', 'สาธิตจุฬาลงกรณ์มหาวิทยาลัย ฝ่ายมัธยม'],
  ['M63A', 'สาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน'],
  ['M63B', 'สาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน'],
  ['M72A', 'แสงทองวิทยา'],
  ['M72B', 'แสงทองวิทยา'],
  ['M74A', 'หาดใหญ่วิทยาลัย'],
]

export default function Home() {
  const [remainTime, setRemainTime] = useState(0)
  const [endReg, setEndReg] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      const endRegistTime =
        Date.parse('16 Aug 2022 23:59:59 GMT+7') - new Date()
      const testTime = Date.parse('27 Aug 2022 08:00:00 GMT+7') - new Date()
      setRemainTime(endRegistTime >= 0 ? endRegistTime : testTime)
      setEndReg(endRegistTime < 0)
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <Head>
        <title>MWIT Square 14th</title>
      </Head>
      <main className='' data-theme='sq'>
        <img
          className='fixed object-none object-left h-full'
          src='img/coverbg.png'
        />
        <img className='absolute w-full' src='img/coverlogo.png' />
        <div className='absolute'>
          <img className='w-full' src='img/covercrop.png' />
          <div className='flex flex-col items-center justify-center space-y-2 pb-8'>
            <div className='font-IBMPlex font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-10 pb-2 max-w-4xl px-10 text-center flex flex-wrap justify-center'>
              <span>การสอบแข่งขันคณิตศาสตร์</span>
              <span>และวิทยาศาสตร์ระหว่างโรงเรียน</span>
              <span className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
                ระดับมัธยมศึกษาตอนต้นประจำปี พ.ศ. 2565
              </span>
            </div>
            <div className='w-full px-4 flex flex-col items-center gap-2 md:gap-4'>
              <div className='flex flex-wrap gap-2 md:gap-4 justify-center md:mt-2'>
                <Link
                  href={
                    'download/ระเบียบการสอบ_MWIT_Square_14th_และคู่มือการใช้งานโปรแกรม_Google.pdf'
                  }
                >
                  <a
                    className='relative ds-btn ds-btn-sm text-white bg-gradient-to-r from-pa to-pb hover:scale-105 transition-all duration-200 font-IBMPlex font-semibold md:ds-btn-md md:text-xl lg:ds-btn-lg lg:text-2xl space-x-2'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FontAwesomeIcon icon={faFileInvoice} />
                    <span>ระเบียบการสอบ</span>
                    <div className='absolute rotate-[5deg] -right-2 md:-right-3 -top-3 text-[0.65rem] md:text-sm lg:text-[0.95rem] py-[0.15rem] sm:py-1 px-2 rounded-full text-white bg-primary'>
                      NEW!
                    </div>
                  </a>
                </Link>
                <Link
                  href={
                    'download/รายชื่อผู้มีสิทธิ์เข้าแข่งขัน_MWIT_Square_14th.pdf'
                  }
                >
                  <a
                    className='ds-btn ds-btn-sm ds-btn-primary hover:scale-105 transition-all duration-200 font-IBMPlex font-bold md:ds-btn-md md:text-xl lg:ds-btn-lg lg:text-2xl space-x-2'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FontAwesomeIcon icon={faClipboardCheck} />
                    <span>รายชื่อผู้มีสิทธิ์เข้าแข่งขัน</span>
                  </a>
                </Link>
              </div>
              <a
                className='ds-btn ds-btn-sm ds-btn-secondary hover:scale-105 transition-all duration-200 font-IBMPlex font-bold md:ds-btn-md md:text-xl lg:ds-btn-lg lg:text-2xl space-x-2'
                href='download/รายละเอียดการสอบ_MWIT_Square_14th.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon icon={faFileLines} />
                <span>รายละเอียดการสอบ</span>
              </a>
            </div>
            <div className='w-full' />
            <div className='ds-dropdown ds-dropdown-hover sm:ds-dropdown-right'>
              <label
                tabIndex='0'
                className='ds-btn ds-btn-sm ds-btn-ghost font-IBMPlex font-bold text-primary md:ds-btn-md md:text-xl lg:text-2xl m-1 space-x-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 md:h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                  />
                </svg>
                <span className=''>ดาวน์โหลดฟอร์มคำรับรองสถานศึกษา</span>
              </label>
              <ul
                tabIndex='0'
                className='ds-dropdown-content ds-menu ds-menu-compact lg:ds-menu-normal p-2 shadow bg-accent rounded-box w-fit'
              >
                <li>
                  <a
                    className=' hover:text-blue-500'
                    href='/download/คํารับรองสถานศึกษา.docx'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FontAwesomeIcon icon={faFileWord} className='h-6' />
                    .docx
                  </a>
                </li>
                <li>
                  <a
                    className='hover:text-red-500'
                    href='/download/คํารับรองสถานศึกษา.pdf'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FontAwesomeIcon icon={faFilePdf} className='h-6' />
                    .pdf
                  </a>
                </li>
              </ul>
            </div>
            <div className='w-full' />
            <div className='max-w-7xl pt-5 px-4 space-y-4 text-center'>
              {/* <span className='text-xl md:text-2xl lg:text-4xl font-IBMPlex font-bold'>
                {'ติดตามการรับสมัครเร็ว ๆ นี้'}
              </span> */}
              <span className='text-xl md:text-2xl lg:text-4xl font-IBMPlex font-bold'>
                ผลการแข่งขันรอบชิงชนะเลิศ
              </span>
              <div className='w-full flex flex-wrap gap-4 items-center justify-center'>
                {awardList.map((a, ai) => (
                  <div
                    key={ai}
                    className='flex flex-col w-full max-w-sm shadow-lg bg-white hover:bg-gray-200 transition-all duration-300 rounded-xl overflow-hidden'
                  >
                    <img src={a.img} className='w-full' />
                    <div className='flex flex-col py-3 px-5'>
                      <span className='font-IBMPlex font-semibold self-center text-xl md:text-2xl whitespace-nowrap'>
                        {a.name}
                      </span>
                      <span className='font-IBMPlex font-medium self-center text-base md:text-lg'>
                        {a.sub}
                      </span>
                      <ol className='list-decimal list-inside mt-2 font-IBMPlexLoop text-base md:text-lg self-start text-start'>
                        {a.std.map((m, mi) => (
                          <li key={mi}>{m}</li>
                        ))}
                      </ol>
                      <span className='font-IBMPlexLoop self-start text-sm md:text-base mt-1'>
                        {a.school}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className='grid grid-cols-4 gap-2 pb-2'>
                <div className='bg-accent rounded-md text-center p-2'>
                  <div className='font-B612Mono text-2xl md:text-4xl'>
                    {Math.floor(remainTime / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-xl'>วัน</div>
                </div>
                <div className='bg-accent rounded-md text-center p-2'>
                  <div className='font-B612Mono text-2xl md:text-4xl'>
                    {Math.floor(
                      (remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    )}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-xl'>
                    ชั่วโมง
                  </div>
                </div>
                <div className='bg-accent rounded-md text-center p-2'>
                  <div className='font-B612Mono text-2xl md:text-4xl'>
                    {Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60))}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-xl'>
                    นาที
                  </div>
                </div>
                <div className='bg-accent rounded-md text-center p-2'>
                  <div className='font-B612Mono text-2xl md:text-4xl'>
                    {Math.floor((remainTime % (1000 * 60)) / 1000)}
                  </div>
                  <div className='font-IBMPlexLoop text-sm md:text-xl'>
                    วินาที
                  </div>
                </div>
              </div>
              <span className='font-IBMPlexLoop text-sm md:text-base lg:text-xl'>
                {!endReg
                  ? 'รับสมัครถึง 16 สิงหาคม 2565'
                  : 'แข่งขัน 27 สิงหาคม 2565'}
              </span> */}
            </div>
            <div className='max-w-7xl pt-5 px-4 space-y-4 text-center'>
              <span className='text-xl md:text-2xl lg:text-4xl font-IBMPlex font-bold'>
                ผลการแข่งขันรอบแรก
              </span>
              <table className='table-auto font-IBMPlexLoop w-fit self-center text-start bg-white rounded-xl overflow-hidden shadow-lg'>
                <thead className='border-b-2 border-b-gray-400 text-base md:text-lg'>
                  <tr>
                    {firstResult[0].map((h, hi) => (
                      <th key={hi} className='px-2'>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='text-sm md:text-base'>
                  {firstResult.map(
                    (t, ti) =>
                      ti > 0 && (
                        <tr
                          key={ti}
                          className='border-b border-gray-300 hover:bg-gray-200/80 transition-colors duration-200'
                        >
                          {t.map((ct, cti) => (
                            <td key={cti} className='py-1 px-2'>
                              {ct}
                            </td>
                          ))}
                        </tr>
                      ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className='w-full bg-gradient-to-b from-transparent to-white py-4 md:p-8'>
            <div className='flex flex-wrap mx-auto gap-2 justify-center'>
              <span className='text-center text-xl md:text-2xl lg:text-4xl text-black font-bold font-IBMPlex'>
                เอกสารที่ต้องใช้
              </span>
              <div className='w-full' />
              <div className='grid grid-cols-2 md:grid-cols-3 w-full max-w-4xl pt-4 px-8 gap-4 gap-y-8'>
                {doc.map((t, idx) => (
                  <div
                    className={
                      (idx === 2 && 'col-span-2 md:col-span-1') +
                      ' grid grid-flow-row content-start justify-items-center gap-3 hover:scale-105 transition-all duration-200 text-pa hover:text-pb'
                    }
                    key={idx}
                  >
                    <FontAwesomeIcon icon={t.icon} className='h-12' />
                    <div className='text-center text-sm md:text-base lg:text-xl font-IBMPlexLoop'>
                      {t.text}
                      <br />
                      {t?.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='w-full bg-gradient-to-r from-pa to-pb py-4 md:p-8'>
            <div className='flex flex-wrap gap-2 justify-center'>
              <span className='text-center text-xl md:text-2xl lg:text-4xl text-white font-bold font-IBMPlex'>
                การแข่งขัน
              </span>
              <div className='w-full' />
              <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl pt-4 px-8 gap-4'>
                {ctInfo.map((t, idx) => (
                  <div
                    className='grid grid-flow-row content-start justify-items-center gap-3 hover:scale-105 transition-all duration-200 text-violet-300 hover:text-violet-100'
                    key={idx}
                  >
                    <FontAwesomeIcon icon={t.icon} className='h-12' />
                    <div className='text-center text-sm md:text-base lg:text-xl font-IBMPlexLoop'>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <footer className='w-full bg-primary p-4 flex flex-wrap items-center gap-2'>
            <img src='img/logo.png' className='h-12 pr-2' />
            <div className='flex flex-col gap-2'>
              <div className='flex flex-wrap gap-x-4 gap-y-1 items-center'>
                {share.map((l, idx) => (
                  <a
                    className='grid grid-flow-col auto-cols-max space-x-2 hover:scale-105 hover:cursor-pointer transition-all text-white hover:text-blue-300'
                    href={l.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={idx}
                  >
                    <FontAwesomeIcon icon={l.icon} className='h-4 md:h-5' />
                    <span className='self-center text-sm md:text-base font-IBMPlex font-semibold'>
                      {l.name}
                    </span>
                  </a>
                ))}
              </div>
              <div className='font-IBMPlexLoop text-xs md:text-sm flex flex-wrap gap-x-2'>
                <span className='text-white'>
                  คณะกรรมการสภานักเรียนฝ่ายวิชาการ
                </span>
                <span className='text-blue-200'>
                  โรงเรียนมหิดลวิทยานุสรณ์ 364 หมู่ 5 ต.ศาลายา อ.พุทธมณฑล
                  จ.นครปฐม 73170
                </span>
              </div>
              {/* <div className='font-IBMPlex text-blue-200 text-xs flex flex-wrap gap-x-2'>
                {'Designed by Trisawan & Created by Patcharapon.'}
              </div> */}
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
