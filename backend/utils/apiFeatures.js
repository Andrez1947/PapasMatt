class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //Method by search by name of product
  search() {
    const keyword = this.queryStr.keyword
      ? {
          nombre: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          }
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //Method by filter by any param of product
  filter() {
    //To filter for category
    const queryCopy = { ...this.queryStr };

    //Removing field from the query (because this words doesn't exist into mongodb collection: keyword', 'limit', 'page')
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(el => delete queryCopy[el]);

    console.log(queryCopy);

    //Advance filter for price, ratings, etc...
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


    console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage -1 );

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
