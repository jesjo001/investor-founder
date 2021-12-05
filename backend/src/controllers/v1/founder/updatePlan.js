// export const updatePlan = async (req, res) => {
//   try {
//     const result = await Founder.findByIdAndUpdate(req.user.id, {
//       $set: {
//         plan: req.body.plan,
//         planDate: req.body.planDate,
//       },
//     }).exec();
//     res.send({ message: 'Plan updated' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).end();
//   }
// };
