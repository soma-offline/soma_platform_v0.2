import { Card, CardContent, makeStyles, CardMedia } from "@material-ui/core";

function Question(props:{figure: string, description: string}){

    const {figure, description} = props;
    const classes = useStyles();


return (
  <Card className={classes.root}>
    <div className={classes.details}>
    <CardContent>
       <p>{description}</p>
      </CardContent>
          {figure? <CardMedia className={classes.media} image={figure} />: ''}
      </div>
      </Card>
)
}

export default Question;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '500px',
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
    content: {
        flex: '1 0 auto',
      },
      media: {
        height: 300,
      },
    }));