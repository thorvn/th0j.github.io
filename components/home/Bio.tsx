import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const Bio = () => {
  let el = useRef(null)
  let typed = useRef(null)

  useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bio',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
    })

    return () => typed.current.destroy()
  }, [])

  return (
    <div>
      <ul id="bio">
        <li>
          I'm aliased as <b className="font-medium">Ken</b>.
        </li>
        <li>
          I live in Ho Chi Minh city, Viet Nam <i className="twe twe-flag-vietnam"></i>
        </li>
        <li>
          I am enthusiastic about new technologies and enjoy working in a professional enviroment.
        </li>
        <li>I'm a VIM enthusiast</li>
        <li>
          I'm a sport guy, I love swimming <i className="twe twe-swimming"></i>
          and running <i className="twe twe-running"></i> .
        </li>
        <li>
          Don't try to be a developer - Try to resolve problems with technologies and make more
          valuation in real life.
        </li>
        <li>
          Company make more valuations for customers, customers will charge more and more for
          company. Engineer make more valuations for company, company will charge everything for
          you.
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

export { Bio }
