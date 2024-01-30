<script>
import { render as renderSchema } from 'amis';
export default {
  name: 'AMISRenderer2',

  render() {
    return renderSchema({
      type: 'page',
      body: 'Hello World!',
    });
  },
};
</script>
