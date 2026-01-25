class APIFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  //  Filter
  filter() {
    // 1) Copy query object
    const queryObj = { ...this.queryParams };

    // 2) Exclude special fields
    const excludingField = ['sort', 'page', 'limit', 'fields'];
    excludingField.forEach((el) => delete queryObj[el]);

    // 3) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // 4) Parse back
    const queryObjParsed = JSON.parse(queryStr);

    this.query = this.query.find(queryObjParsed);
    return this;
  }

  sort() {
    // 5) Sorting
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(',').join(' ');
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 6) Fields Limiting
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 7) Pagination
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
