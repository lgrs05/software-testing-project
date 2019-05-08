from app.base import BaseTestCase
from . import factories

class CommentsTestCase(BaseTestCase):
    def test_post_comment(self):
        comment = factories.CommentFactory()
        response = self.client.post('/post', comment)
        assert response.status_code == 200
