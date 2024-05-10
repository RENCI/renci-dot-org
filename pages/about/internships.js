import { Typography } from '@mui/material'
import { Page } from '../../components'

export default function Internships() {
  return (
    <Page
      title="Internships"
    >
      <Typography paragraph>
        We know that engaging with the next generation of thinkers is essential
        to bring fresh perspectives and unique skill sets to our organization.
        Our organization can help you grow professionally in your particular
        area of interest, while you will also undoubtedly help us grow by
        bringing your own innovative ideas and insights and providing feedback
        to improve our internship program. 
      </Typography>

      <Typography paragraph>
        Please see below for existing internship openings. If you do not see
        anything that would be a good fit for you at this time, fill out this
        form to express your interest, and we will see if there is an
        opportunity available that matches your interests. To learn more about
        our internship program, please reach out to the Internship Program
        Management Team at internships[at]renci[dot]org.
      </Typography>
    </Page>
  )
}

// there is no data needed for this page, but this is a workaround to prevent getInitialProps from
// running on this client page
export const getStaticProps = () => {
  return { props: { dummyValue: 1 }}
}
